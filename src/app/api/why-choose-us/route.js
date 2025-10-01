import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all why choose us items
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('active');

    const where = {};
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const items = await prisma.whyChooseUs.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Error fetching why choose us items:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST new why choose us item
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      slug,
      description,
      icon,
      color,
      order,
      isActive = true
    } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Get max order to set default
    const maxOrderItem = await prisma.whyChooseUs.findFirst({
      orderBy: { order: 'desc' }
    });
    const defaultOrder = maxOrderItem ? maxOrderItem.order + 1 : 1;

    const item = await prisma.whyChooseUs.create({
      data: {
        title,
        slug,
        description,
        icon: icon || 'award',
        color: color || 'primary',
        order: order || defaultOrder,
        isActive: isActive !== false
      }
    });

    return NextResponse.json({
      success: true,
      data: item,
      message: 'Item created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating why choose us item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create item' + error.message },
      { status: 500 }
    );
  }
}