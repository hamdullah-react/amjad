import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to make slug unique
async function makeSlugUnique(slug, excludeId = null) {
  let uniqueSlug = slug;
  let counter = 1;
  
  while (true) {
    const where = { slug: uniqueSlug };
    if (excludeId) {
      where.NOT = { id: excludeId };
    }
    
    const existingService = await prisma.service.findFirst({
      where
    });
    
    if (!existingService) {
      break;
    }
    
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

// GET single service by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    });

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT update service by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove id from body if present
    const { id: _, ...updateData } = body;

    // Convert price to float if present
    if (updateData.price !== undefined) {
      updateData.price = updateData.price ? parseFloat(updateData.price) : null;
    }

    // Handle slug update
    if (updateData.slug !== undefined || updateData.title !== undefined) {
      let finalSlug;
      
      if (updateData.slug) {
        // Use provided slug but ensure it's unique
        finalSlug = await makeSlugUnique(generateSlug(updateData.slug), id);
      } else if (updateData.title) {
        // Auto-generate slug from title if title changed
        const baseSlug = generateSlug(updateData.title);
        finalSlug = await makeSlugUnique(baseSlug, id);
      }
      
      if (finalSlug) {
        updateData.slug = finalSlug;
      }
    }

    const updatedService = await prisma.service.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: updatedService,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error updating service:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'A service with this slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE service by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if service exists and has bookings
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    });

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    // Warn if service has bookings
    if (service._count.bookings > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot delete service. It is associated with ${service._count.bookings} booking(s).`
        },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete service' },
      { status: 500 }
    );
  }
}