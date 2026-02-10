import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET a single statistic
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const statistic = await prisma.statistic.findUnique({
      where: { id },
    });

    if (!statistic) {
      return NextResponse.json(
        { success: false, message: 'Statistic not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: statistic });
  } catch (error) {
    console.error('Error fetching statistic:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistic' },
      { status: 500 }
    );
  }
}

// PUT - update a statistic
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { label, value, prefix, suffix, icon, color, order, isAnimated, isActive } = body;

    const result = await prisma.statistic.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(value !== undefined && { value }),
        ...(prefix !== undefined && { prefix }),
        ...(suffix !== undefined && { suffix }),
        ...(icon !== undefined && { icon }),
        ...(color !== undefined && { color }),
        ...(order !== undefined && { order }),
        ...(isAnimated !== undefined && { isAnimated }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Statistic updated successfully',
    });
  } catch (error) {
    console.error('Error updating statistic:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update statistic' },
      { status: 500 }
    );
  }
}

// DELETE a statistic
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.statistic.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Statistic deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting statistic:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete statistic' },
      { status: 500 }
    );
  }
}
