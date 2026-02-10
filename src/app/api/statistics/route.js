import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all statistics
export async function GET() {
  try {
    const statistics = await prisma.statistic.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

// POST - create a new statistic
export async function POST(request) {
  try {
    const body = await request.json();
    const { label, value, prefix, suffix, icon, color, order, isAnimated } = body;

    if (!label || !value || !icon) {
      return NextResponse.json(
        { success: false, message: 'label, value, and icon are required' },
        { status: 400 }
      );
    }

    const result = await prisma.statistic.create({
      data: {
        label,
        value,
        prefix: prefix || null,
        suffix: suffix || null,
        icon,
        color: color || 'blue',
        order: order || 0,
        isAnimated: isAnimated !== undefined ? isAnimated : true,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Statistic created successfully',
    });
  } catch (error) {
    console.error('Error creating statistic:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create statistic' },
      { status: 500 }
    );
  }
}
