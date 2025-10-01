import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single item by ID
export async function GET(request, { params }) {
  try {
    const { slug } = params;

    const item = await prisma.whyChooseUs.findUnique({
      where: { slug }
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