import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single welcome section
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const welcomeSection = await prisma.welcomeSection.findUnique({
      where: { id }
    });

    if (!welcomeSection) {
      return NextResponse.json(
        { success: false, message: 'Welcome section not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: welcomeSection
    });
  } catch (error) {
    console.error('Error fetching welcome section:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch welcome section' },
      { status: 500 }
    );
  }
}

// PUT update welcome section
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // If setting as active, deactivate all others first
    if (body.isActive) {
      await prisma.welcomeSection.updateMany({
        where: {
          isActive: true,
          NOT: { id }
        },
        data: { isActive: false }
      });
    }

    const welcomeSection = await prisma.welcomeSection.update({
      where: { id },
      data: body
    });

    return NextResponse.json({
      success: true,
      data: welcomeSection,
      message: 'Welcome section updated successfully'
    });
  } catch (error) {
    console.error('Error updating welcome section:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update welcome section' },
      { status: 500 }
    );
  }
}

// DELETE welcome section
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.welcomeSection.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Welcome section deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting welcome section:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete welcome section' },
      { status: 500 }
    );
  }
}