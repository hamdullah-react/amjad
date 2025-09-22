import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Test Supabase Storage connection
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
  try {
    console.log('Testing Supabase Storage connection...')
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Service Role Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    // List buckets to test connection
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError)
      return NextResponse.json({
        success: false,
        message: 'Failed to connect to Supabase Storage',
        error: bucketsError.message,
        details: bucketsError
      }, { status: 500 })
    }

    console.log('Available buckets:', buckets)

    // Check if 'amjad' bucket exists
    const amjadBucket = buckets?.find(bucket => bucket.name === 'amjad')

    if (!amjadBucket) {
      return NextResponse.json({
        success: false,
        message: 'Bucket "amjad" does not exist',
        availableBuckets: buckets?.map(b => b.name) || [],
        createBucketSuggestion: 'You need to create a bucket named "amjad" in your Supabase Storage dashboard'
      }, { status: 404 })
    }

    // Test bucket access by listing files
    const { data: files, error: filesError } = await supabase.storage
      .from('amjad')
      .list('', { limit: 5 })

    if (filesError) {
      console.error('Error accessing amjad bucket:', filesError)
      return NextResponse.json({
        success: false,
        message: 'Cannot access "amjad" bucket',
        error: filesError.message,
        details: filesError
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase Storage connection successful',
      bucketExists: true,
      bucketName: 'amjad',
      filesInBucket: files?.length || 0,
      sampleFiles: files?.slice(0, 3) || []
    })

  } catch (error) {
    console.error('Test storage error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to test storage connection',
      error: error.message
    }, { status: 500 })
  }
}