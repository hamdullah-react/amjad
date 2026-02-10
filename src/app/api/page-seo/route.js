import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all page SEO settings
export async function GET() {
  try {
    const pages = await prisma.seoSettings.findMany({
      orderBy: { page: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    console.error('Error fetching page SEO settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page SEO settings' },
      { status: 500 }
    );
  }
}

// POST - create or update a page SEO entry
export async function POST(request) {
  try {
    const body = await request.json();
    const { page, title, description, keywords, canonical, ogTitle, ogDescription, ogImage, priority, changeFreq } = body;

    if (!page || !title || !description) {
      return NextResponse.json(
        { success: false, message: 'page, title, and description are required' },
        { status: 400 }
      );
    }

    const result = await prisma.seoSettings.upsert({
      where: { page },
      update: {
        title,
        description,
        keywords: keywords || null,
        canonical: canonical || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
        ogImage: ogImage || null,
        priority: priority ? parseFloat(priority) : 1.0,
        changeFreq: changeFreq || 'monthly',
      },
      create: {
        page,
        title,
        description,
        keywords: keywords || null,
        canonical: canonical || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
        ogImage: ogImage || null,
        priority: priority ? parseFloat(priority) : 1.0,
        changeFreq: changeFreq || 'monthly',
      },
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: `SEO settings for "${page}" saved successfully`,
    });
  } catch (error) {
    console.error('Error saving page SEO settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save page SEO settings' },
      { status: 500 }
    );
  }
}
