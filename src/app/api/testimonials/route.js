import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all testimonials
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('active');
    const isFeatured = searchParams.get('featured');

    const where = {};
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }
    if (isFeatured !== null) {
      where.isFeatured = isFeatured === 'true';
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' },
        { createdAt: 'desc' }
      ],
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

    return NextResponse.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST new testimonial
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      position,
      content,
      rating,
      imageUrl,
      service,
      location,
      isFeatured,
      isActive,
      userId
    } = body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        email,
        company,
        position,
        content,
        rating: rating || 5,
        imageUrl,
        service,
        location,
        isFeatured: isFeatured || false,
        isActive: isActive !== false,
        userId
      }
    });

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}