import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch all hero sliders
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('active')

    const where = {}
    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const sliders = await prisma.heroSlider.findMany({
      where,
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({
      success: true,
      data: sliders
    })
  } catch (error) {
    console.error('Error fetching hero sliders:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch hero sliders',
      error: error.message
    }, { status: 500 })
  }
}

// POST - Create new hero slider
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, subtitle, description, imageUrl, buttonText, buttonUrl, order, isActive } = body

    // Validate required fields
    if (!title || !imageUrl) {
      return NextResponse.json({
        success: false,
        message: 'Title and image URL are required'
      }, { status: 400 })
    }

    const slider = await prisma.heroSlider.create({
      data: {
        title,
        subtitle,
        description,
        imageUrl,
        buttonText,
        buttonUrl,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Hero slider created successfully',
      data: slider
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating hero slider:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to create hero slider',
      error: error.message
    }, { status: 500 })
  }
}