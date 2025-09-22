import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all FAQs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('active');
    const category = searchParams.get('category');

    const where = {};
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }
    if (category) {
      where.category = category;
    }

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({
      success: true,
      data: faqs
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST new FAQ
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      question,
      answer,
      category,
      order,
      isActive
    } = body;

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category,
        order: order || 0,
        isActive: isActive !== false
      }
    });

    return NextResponse.json({
      success: true,
      data: faq,
      message: 'FAQ created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}