import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all blog posts
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const where = {};

    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    if (category && category !== 'all') {
      where.category = category;
    }

    if (featured !== null && featured !== 'all') {
      where.isFeatured = featured === 'true';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { publishedAt: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.blogPost.count({ where })
    ]);

    // Get statistics
    const stats = await prisma.blogPost.groupBy({
      by: ['status'],
      _count: { _all: true }
    });

    const statsMap = stats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count._all;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      stats: {
        total,
        published: statsMap.published || 0,
        draft: statsMap.draft || 0,
        archived: statsMap.archived || 0
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST new blog post
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content, // Now expects JSON structure
      author,
      category,
      tags,
      featuredImage,
      readTime,
      isFeatured,
      status,
      publishedAt,
      // Removed SEO fields for now
    } = body;

    // Generate slug if not provided
    let finalSlug = slug;
    if (!finalSlug) {
      finalSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if slug exists and make it unique
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: finalSlug }
      });

      if (existingPost) {
        const timestamp = Date.now();
        finalSlug = `${finalSlug}-${timestamp}`;
      }
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content: content || { blocks: [] }, // Default empty content structure
        author,
        category,
        tags: tags || [],
        featuredImage,
        readTime,
        isFeatured: isFeatured || false,
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
        // SEO fields removed for simplicity
      }
    });

    return NextResponse.json({
      success: true,
      data: post,
      message: 'Blog post created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'A blog post with this slug already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}