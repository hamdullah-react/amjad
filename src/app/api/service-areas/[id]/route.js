import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single service area
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const serviceArea = await prisma.serviceArea.findUnique({
      where: { id }
    });

    if (!serviceArea) {
      return NextResponse.json(
        { success: false, message: 'Service area not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: serviceArea });
  } catch (error) {
    console.error('Error fetching service area:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service area' },
      { status: 500 }
    );
  }
}

// PUT update service area
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove id from body if present
    const { id: _, ...updateData } = body;

    // Convert extraCharges to Decimal if present
    if (updateData.extraCharges !== undefined) {
      updateData.extraCharges = updateData.extraCharges ? parseFloat(updateData.extraCharges) : null;
    }

    // Check for duplicates if updating city/emirate/area
    if (updateData.city || updateData.emirate || updateData.area !== undefined) {
      const existing = await prisma.serviceArea.findFirst({
        where: {
          city: updateData.city || undefined,
          emirate: updateData.emirate || undefined,
          area: updateData.area || null,
          NOT: { id }
        }
      });

      if (existing) {
        return NextResponse.json(
          { success: false, message: 'A service area with these details already exists' },
          { status: 400 }
        );
      }
    }

    const serviceArea = await prisma.serviceArea.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: serviceArea,
      message: 'Service area updated successfully'
    });
  } catch (error) {
    console.error('Error updating service area:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Service area not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update service area' },
      { status: 500 }
    );
  }
}

// DELETE service area
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.serviceArea.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Service area deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service area:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Service area not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete service area' },
      { status: 500 }
    );
  }
}