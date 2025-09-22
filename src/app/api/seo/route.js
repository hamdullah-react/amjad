import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET SEO settings
export async function GET() {
  try {
    const seoSettings = await prisma.companySettings.findUnique({
      where: { key: 'seo_settings' }
    });

    if (!seoSettings) {
      // Return default SEO settings if not set
      return NextResponse.json({
        success: true,
        data: {
          // Global SEO
          siteTitle: 'Marhaba Movers & Packers',
          titleSeparator: '|',
          siteDescription: '',
          keywords: [],
          author: '',
          robots: 'index, follow',
          googleVerification: '',
          bingVerification: '',

          // Open Graph
          ogTitle: '',
          ogDescription: '',
          ogImage: '',
          ogType: 'website',
          ogUrl: '',

          // Twitter Card
          twitterCard: 'summary_large_image',
          twitterSite: '',
          twitterCreator: '',
          twitterTitle: '',
          twitterDescription: '',
          twitterImage: '',

          // Schema Markup
          schemaType: 'LocalBusiness',
          schemaBusinessName: '',
          schemaBusinessType: 'MovingCompany',
          schemaPriceRange: '$$',
          schemaLogo: '',
          schemaImage: '',
          schemaAddress: '',
          schemaPhone: '',
          schemaEmail: '',
          schemaOpeningHours: [],
          schemaGeoLatitude: '',
          schemaGeoLongitude: '',
          schemaRating: '',
          schemaReviewCount: '',

          // Sitemap
          sitemapEnabled: true,
          sitemapChangeFrequency: 'weekly',
          sitemapPriority: '0.8',
          excludedPages: [],

          // Analytics & Tracking
          googleAnalyticsId: '',
          googleTagManagerId: '',
          facebookPixelId: '',
          hotjarId: '',
          clarityProjectId: '',

          // Advanced
          canonicalUrl: '',
          alternateLanguages: [],
          structuredDataEnabled: true,
          richSnippetsEnabled: true,
          breadcrumbsEnabled: true,
          faqSchemaEnabled: true,
          localBusinessSchemaEnabled: true,
          customHeadScripts: '',
          customBodyScripts: ''
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: seoSettings.value
    });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch SEO settings' },
      { status: 500 }
    );
  }
}

// POST/PUT SEO settings
export async function POST(request) {
  try {
    const body = await request.json();

    // Remove id and timestamps if present
    const { id, createdAt, updatedAt, ...data } = body;

    // Check if SEO settings exist
    const existing = await prisma.companySettings.findUnique({
      where: { key: 'seo_settings' }
    });

    let result;
    if (existing) {
      // Update existing
      result = await prisma.companySettings.update({
        where: { key: 'seo_settings' },
        data: {
          value: data,
          description: 'SEO and meta tags configuration'
        }
      });
    } else {
      // Create new
      result = await prisma.companySettings.create({
        data: {
          key: 'seo_settings',
          value: data,
          description: 'SEO and meta tags configuration'
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: result.value,
      message: 'SEO settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update SEO settings' },
      { status: 500 }
    );
  }
}