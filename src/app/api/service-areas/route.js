import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all service areas
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const emirate = searchParams.get('emirate');
    const isActive = searchParams.get('isActive');
    const isPrimary = searchParams.get('isPrimary');

    // Build where clause
    const where = {};

    if (search) {
      where.OR = [
        { city: { contains: search, mode: 'insensitive' } },
        { emirate: { contains: search, mode: 'insensitive' } },
        { area: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (emirate && emirate !== 'all') {
      where.emirate = emirate;
    }

    if (isActive !== null && isActive !== 'all') {
      where.isActive = isActive === 'true';
    }

    if (isPrimary !== null && isPrimary !== 'all') {
      where.isPrimary = isPrimary === 'true';
    }

    const serviceAreas = await prisma.serviceArea.findMany({
      where,
      orderBy: [
        { isPrimary: 'desc' },
        { order: 'asc' },
        { emirate: 'asc' },
        { city: 'asc' }
      ],
    });

    // Calculate statistics
    const stats = {
      total: serviceAreas.length,
      active: serviceAreas.filter(area => area.isActive).length,
      inactive: serviceAreas.filter(area => !area.isActive).length,
      primary: serviceAreas.filter(area => area.isPrimary).length,
      emirates: [...new Set(serviceAreas.map(area => area.emirate))].length,
    };

    return NextResponse.json({
      success: true,
      data: serviceAreas,
      stats
    });
  } catch (error) {
    console.error('Error fetching service areas:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch service areas' },
      { status: 500 }
    );
  }
}

// POST create new service area
export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Creating service area with data:', body);

    // Validate required fields
    if (!body.city || !body.emirate) {
      return NextResponse.json(
        { success: false, message: 'City and emirate are required' },
        { status: 400 }
      );
    }

    try {
      // Check for duplicates
      const existing = await prisma.serviceArea.findFirst({
        where: {
          city: body.city,
          emirate: body.emirate,
          area: body.area || null
        }
      });

      if (existing) {
        return NextResponse.json(
          { success: false, message: 'This service area already exists' },
          { status: 400 }
        );
      }
    } catch (dbError) {
      console.error('Database check error:', dbError);
      // If the table doesn't exist or there's a schema issue, continue to try creating
      if (dbError.code !== 'P2021') {
        // P2021 is "table does not exist" error
        // For other errors, we might want to handle differently
      }
    }

    // Create service area
    const serviceArea = await prisma.serviceArea.create({
      data: {
        city: body.city,
        emirate: body.emirate,
        area: body.area || null,
        description: body.description || null,
        coverage: body.coverage || [],
        postalCodes: body.postalCodes || [],
        isActive: body.isActive !== undefined ? body.isActive : true,
        isPrimary: body.isPrimary || false,
        deliveryTime: body.deliveryTime || null,
        extraCharges: body.extraCharges ? parseFloat(body.extraCharges) : null,
        order: body.order || 0,
      }
    });

    console.log('Service area created successfully:', serviceArea);

    return NextResponse.json({
      success: true,
      data: serviceArea,
      message: 'Service area created successfully'
    });
  } catch (error) {
    console.error('Error creating service area - Full error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    // Provide more detailed error messages
    let errorMessage = 'Failed to create service area';

    if (error.code === 'P2002') {
      errorMessage = 'A service area with this information already exists';
    } else if (error.code === 'P2021') {
      errorMessage = 'Database table not found. Please ensure database is properly migrated.';
    } else if (error.message) {
      errorMessage = `Database error: ${error.message}`;
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}