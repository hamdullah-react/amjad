import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single blog post by slug
export async function GET(request, { params }) {
  try {
    // Remove await - params is already resolved
    const { slug } = await params;

    console.log("slug",slug)   

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.findUnique({
      where: { slug }
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}