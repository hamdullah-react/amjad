import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to make slug unique
async function makeSlugUnique(slug) {
  let uniqueSlug = slug;
  let counter = 1;
  
  while (true) {
    const existingService = await prisma.service.findUnique({
      where: { slug: uniqueSlug }
    });
    
    if (!existingService) {
      break;
    }
    
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

// GET all services
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('active');

    const where = {};
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        _count: {
          select: { bookings: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST new service
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      shortDesc,
      icon,
      imageUrl,
      price,
      features,
      order,
      isActive,
      slug // Optional: allow custom slug
    } = body;

    // Generate slug from title if not provided
    let finalSlug;
    if (slug) {
      // Use provided slug but ensure it's unique
      finalSlug = await makeSlugUnique(generateSlug(slug));
    } else {
      // Auto-generate slug from title
      const baseSlug = generateSlug(title);
      finalSlug = await makeSlugUnique(baseSlug);
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        shortDesc,
        icon,
        imageUrl,
        price: price ? parseFloat(price) : null,
        features: features || [],
        order: order || 0,
        isActive: isActive !== false,
        slug: finalSlug
      }
    });

    return NextResponse.json({
      success: true,
      data: service,
      message: 'Service created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'A service with this slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to create service' },
      { status: 500 }
    );
  }
}