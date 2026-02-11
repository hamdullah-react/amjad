import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single testimonial by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonial' },
      { status: 500 }
    );
  }
}

// PUT update testimonial by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove id from body if present
    const { id: _, ...updateData } = body;

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: updatedTestimonial,
      message: 'Testimonial updated successfully'
    });
  } catch (error) {
    console.error('Error updating testimonial:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

// DELETE testimonial by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.testimonial.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}