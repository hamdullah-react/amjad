import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client for storage operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET - Fetch single hero slider
export async function GET(request, { params }) {
  try {
    const { id } = await params

    const slider = await prisma.heroSlider.findUnique({
      where: { id }
    })

    if (!slider) {
      return NextResponse.json({
        success: false,
        message: 'Hero slider not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: slider
    })
  } catch (error) {
    console.error('Error fetching hero slider:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch hero slider',
      error: error.message
    }, { status: 500 })
  }
}

// PUT - Update hero slider
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, subtitle, description, imageUrl, buttonText, buttonUrl, order, isActive } = body

    // Check if slider exists
    const existingSlider = await prisma.heroSlider.findUnique({
      where: { id }
    })

    if (!existingSlider) {
      return NextResponse.json({
        success: false,
        message: 'Hero slider not found'
      }, { status: 404 })
    }

    // Validate required fields
    if (!title || !imageUrl) {
      return NextResponse.json({
        success: false,
        message: 'Title and image URL are required'
      }, { status: 400 })
    }

    // If the image URL has changed, delete the old file from storage
    if (existingSlider.imageUrl && existingSlider.imageUrl !== imageUrl) {
      try {
        const oldUrl = new URL(existingSlider.imageUrl)
        const pathParts = oldUrl.pathname.split('/storage/v1/object/public/amjad/')

        if (pathParts.length > 1) {
          const oldFilePath = pathParts[1]
          console.log('Deleting old slider file from storage:', oldFilePath)

          // Delete old file from Supabase Storage
          const { error: deleteError } = await supabase.storage
            .from('amjad')
            .remove([oldFilePath])

          if (deleteError) {
            console.error('Error deleting old file from storage:', deleteError)
            // Continue with update even if old file deletion fails
          } else {
            console.log('Old slider file deleted from storage successfully')
          }
        }
      } catch (urlError) {
        console.error('Error parsing old image URL:', urlError)
        // Continue with update even if URL parsing fails
      }
    }

    const updatedSlider = await prisma.heroSlider.update({
      where: { id },
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
      message: 'Hero slider updated successfully',
      data: updatedSlider
    })
  } catch (error) {
    console.error('Error updating hero slider:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to update hero slider',
      error: error.message
    }, { status: 500 })
  }
}

// DELETE - Delete hero slider
export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    // Check if slider exists
    const existingSlider = await prisma.heroSlider.findUnique({
      where: { id }
    })

    if (!existingSlider) {
      return NextResponse.json({
        success: false,
        message: 'Hero slider not found'
      }, { status: 404 })
    }

    // Extract file path from the image URL
    // The URL format is: https://[project].supabase.co/storage/v1/object/public/amjad/[filename]
    if (existingSlider.imageUrl) {
      try {
        const url = new URL(existingSlider.imageUrl)
        const pathParts = url.pathname.split('/storage/v1/object/public/amjad/')

        if (pathParts.length > 1) {
          const filePath = pathParts[1]
          console.log('Attempting to delete file from storage:', filePath)

          // Delete file from Supabase Storage
          const { error: deleteError } = await supabase.storage
            .from('amjad')
            .remove([filePath])

          if (deleteError) {
            console.error('Error deleting file from storage:', deleteError)
            // Continue with database deletion even if storage deletion fails
          } else {
            console.log('File deleted from storage successfully')
          }
        }
      } catch (urlError) {
        console.error('Error parsing image URL:', urlError)
        // Continue with database deletion even if URL parsing fails
      }
    }

    // Delete from database
    await prisma.heroSlider.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Hero slider and file deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting hero slider:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to delete hero slider',
      error: error.message
    }, { status: 500 })
  }
}