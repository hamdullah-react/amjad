import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
      isActive
    } = body;

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
        isActive: isActive !== false
      }
    });

    return NextResponse.json({
      success: true,
      data: service,
      message: 'Service created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create service' },
      { status: 500 }
    );
  }
}