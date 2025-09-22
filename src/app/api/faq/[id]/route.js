import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single FAQ by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const faq = await prisma.fAQ.findUnique({
      where: { id }
    });

    if (!faq) {
      return NextResponse.json(
        { success: false, message: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch FAQ' },
      { status: 500 }
    );
  }
}

// PUT update FAQ by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Remove id from body if present
    const { id: _, ...updateData } = body;

    const updatedFaq = await prisma.fAQ.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: updatedFaq,
      message: 'FAQ updated successfully'
    });
  } catch (error) {
    console.error('Error updating FAQ:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE FAQ by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.fAQ.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}