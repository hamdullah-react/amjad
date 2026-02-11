import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single item by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const item = await prisma.whyChooseUs.findUnique({
      where: { id }
    });

    if (!item) {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching why choose us item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

// PUT update item by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove id from body if present
    const { id: _, ...updateData } = body;

    const updatedItem = await prisma.whyChooseUs.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: 'Item updated successfully'
    });
  } catch (error) {
    console.error('Error updating why choose us item:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update item: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE item by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.whyChooseUs.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting why choose us item:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete item: ' + error.message },
      { status: 500 }
    );
  }
}