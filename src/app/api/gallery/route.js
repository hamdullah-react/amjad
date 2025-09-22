import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch all gallery images
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')

    const whereClause = {}

    if (category && category !== 'all') {
      whereClause.category = category
    }

    if (isActive && isActive !== 'all') {
      whereClause.isActive = isActive === 'true'
    }

    const images = await prisma.gallery.findMany({
      where: whereClause,
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({
      success: true,
      data: images
    })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch gallery images',
      error: error.message
    }, { status: 500 })
  }
}

// POST - Create new gallery image
export async function POST(request) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, category, tags, order, isActive } = body

    // Validate required fields
    if (!title || !imageUrl) {
      return NextResponse.json({
        success: false,
        message: 'Title and image URL are required'
      }, { status: 400 })
    }

    const newImage = await prisma.gallery.create({
      data: {
        title,
        description: description || '',
        imageUrl,
        category: category || 'general',
        tags: tags || [],
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Gallery image created successfully',
      data: newImage
    })
  } catch (error) {
    console.error('Error creating gallery image:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to create gallery image',
      error: error.message
    }, { status: 500 })
  }
}