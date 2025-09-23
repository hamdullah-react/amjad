import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET welcome section
export async function GET(request) {
  try {
    // Check if prisma is properly initialized
    if (!prisma) {
      console.error('Prisma client is not initialized');
      return NextResponse.json(
        {
          success: false,
          message: 'Database connection error',
          error: 'Prisma client not initialized'
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('active');

    const where = {};
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    console.log('Fetching welcome sections with filter:', where);

    const welcomeSections = await prisma.welcomeSection.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${welcomeSections.length} welcome sections`);

    // If there's only one active section, return it directly
    if (welcomeSections.length === 1) {
      return NextResponse.json({
        success: true,
        data: welcomeSections[0]
      });
    }

    // If no sections found, return null instead of empty array
    if (welcomeSections.length === 0) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No welcome sections found'
      });
    }

    return NextResponse.json({
      success: true,
      data: welcomeSections
    });
  } catch (error) {
    console.error('Error fetching welcome section:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch welcome section',
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// POST new welcome section
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      subtitle,
      description,
      ceoName,
      ceoPosition,
      ceoMessage,
      buttonText,
      buttonUrl,
      features,
      stats,
      isActive
    } = body;

    // If setting as active, deactivate all others first
    if (isActive) {
      await prisma.welcomeSection.updateMany({
        where: { isActive: true },
        data: { isActive: false }
      });
    }

    const welcomeSection = await prisma.welcomeSection.create({
      data: {
        title,
        subtitle,
        description,
        ceoName,
        ceoPosition: ceoPosition || 'Chief Executive Officer',
        ceoMessage,
        buttonText,
        buttonUrl,
        features: features || [],
        stats: stats || [],
        isActive: isActive !== false
      }
    });

    return NextResponse.json({
      success: true,
      data: welcomeSection,
      message: 'Welcome section created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating welcome section:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create welcome section' },
      { status: 500 }
    );
  }
}

// PUT update welcome section
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Section ID is required' },
        { status: 400 }
      );
    }

    // If setting as active, deactivate all others first
    if (updateData.isActive) {
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
      data: updateData
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