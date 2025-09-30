import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single service area
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const serviceArea = await prisma.serviceArea.findUnique({
      where: { slug }
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
