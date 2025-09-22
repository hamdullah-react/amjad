import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET single blog post by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { id }
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT update blog post by ID
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove id from body if present
    const { id: _, ...updateData } = body;

    // Handle slug update
    if (updateData.slug) {
      // Check if slug exists on another post
      const existingPost = await prisma.blogPost.findFirst({
        where: {
          slug: updateData.slug,
          NOT: { id }
        }
      });

      if (existingPost) {
        return NextResponse.json(
          { success: false, message: 'A blog post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Handle publish date
    if (updateData.status === 'PUBLISHED' && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    } else if (updateData.status !== 'PUBLISHED') {
      updateData.publishedAt = null;
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog post:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'A blog post with this slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE blog post by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.blogPost.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}