import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client for storage operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET - Fetch single gallery image
export async function GET(request, { params }) {
  try {
    const { id } = await params

    const image = await prisma.gallery.findUnique({
      where: { id }
    })

    if (!image) {
      return NextResponse.json({
        success: false,
        message: 'Gallery image not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: image
    })
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch gallery image',
      error: error.message
    }, { status: 500 })
  }
}

// PUT - Update gallery image
export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, imageUrl, category, tags, order, isActive } = body

    // Check if image exists
    const existingImage = await prisma.gallery.findUnique({
      where: { id }
    })

    if (!existingImage) {
      return NextResponse.json({
        success: false,
        message: 'Gallery image not found'
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
    if (existingImage.imageUrl && existingImage.imageUrl !== imageUrl) {
      try {
        const oldUrl = new URL(existingImage.imageUrl)
        const pathParts = oldUrl.pathname.split('/storage/v1/object/public/amjad/')

        if (pathParts.length > 1) {
          const oldFilePath = pathParts[1]
          console.log('Deleting old file from storage:', oldFilePath)

          // Delete old file from Supabase Storage
          const { error: deleteError } = await supabase.storage
            .from('amjad')
            .remove([oldFilePath])

          if (deleteError) {
            console.error('Error deleting old file from storage:', deleteError)
            // Continue with update even if old file deletion fails
          } else {
            console.log('Old file deleted from storage successfully')
          }
        }
      } catch (urlError) {
        console.error('Error parsing old image URL:', urlError)
        // Continue with update even if URL parsing fails
      }
    }

    const updatedImage = await prisma.gallery.update({
      where: { id },
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
      message: 'Gallery image updated successfully',
      data: updatedImage
    })
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to update gallery image',
      error: error.message
    }, { status: 500 })
  }
}

// DELETE - Delete gallery image
export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    // Check if image exists
    const existingImage = await prisma.gallery.findUnique({
      where: { id }
    })

    if (!existingImage) {
      return NextResponse.json({
        success: false,
        message: 'Gallery image not found'
      }, { status: 404 })
    }

    // Extract file path from the image URL
    // The URL format is: https://[project].supabase.co/storage/v1/object/public/amjad/[filename]
    if (existingImage.imageUrl) {
      try {
        const url = new URL(existingImage.imageUrl)
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
    await prisma.gallery.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Gallery image and file deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to delete gallery image',
      error: error.message
    }, { status: 500 })
  }
}