import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET a single page's SEO settings
export async function GET(request, { params }) {
  try {
    const { page } = await params;
    const seo = await prisma.seoSettings.findUnique({
      where: { page },
    });

    if (!seo) {
      return NextResponse.json(
        { success: false, message: 'Page SEO settings not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: seo,
    });
  } catch (error) {
    console.error('Error fetching page SEO:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch page SEO settings' },
      { status: 500 }
    );
  }
}

// DELETE a page's SEO settings
export async function DELETE(request, { params }) {
  try {
    const { page } = await params;
    await prisma.seoSettings.delete({
      where: { page },
    });

    return NextResponse.json({
      success: true,
      message: `SEO settings for "${page}" deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting page SEO:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete page SEO settings' },
      { status: 500 }
    );
  }
}
