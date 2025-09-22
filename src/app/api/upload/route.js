import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role key for server-side file uploads
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const category = formData.get('category') || 'general'
    const title = formData.get('title') || file.name
    const description = formData.get('description') || ''

    if (!file) {
      return NextResponse.json({
        success: false,
        message: 'No file provided'
      }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid file type. Only JPG, PNG, GIF, and WebP files are allowed.'
      }, { status: 400 })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      }, { status: 400 })
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = fileName // Don't add bucket name to path since we specify bucket with .from()

    // Upload to Supabase Storage
    console.log('Attempting to upload to bucket: amjad, path:', filePath)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('amjad')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      console.error('Upload error details:', JSON.stringify(uploadError, null, 2))
      return NextResponse.json({
        success: false,
        message: 'Failed to upload image to storage',
        error: uploadError.message,
        details: uploadError
      }, { status: 500 })
    }

    console.log('Upload successful:', uploadData)

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('amjad')
      .getPublicUrl(filePath)

    // Don't save to database here - let the gallery page handle that
    // This API only handles the file upload to storage

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: publicUrl,
        title: title || file.name,
        category,
        fileName,
        filePath
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    }, { status: 500 })
  }
}