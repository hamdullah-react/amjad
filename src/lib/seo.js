// src/lib/seo.js
import prisma from '@/lib/prisma';

export async function getSEOSettings() {
  try {
    const settings = await prisma.companySettings.findUnique({
      where: { key: 'seo_settings' }
    });

    if (!settings) {
      return getDefaultSEOSettings();
    }

    return settings.value;
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return getDefaultSEOSettings();
  }
}

export async function getPageSEO(page) {
  try {
    const seo = await prisma.seoSettings.findUnique({
      where: { page }
    });
    return seo;
  } catch (error) {
    console.error(`Error fetching SEO for page ${page}:`, error);
    return null;
  }
}

function getDefaultSEOSettings() {
  return {
    siteTitle: 'Marhaba Movers & Packers',
    titleSeparator: '|',
    siteDescription: '',
    keywords: [],
    author: '',
    robots: 'index, follow',
    googleVerification: '',
    bingVerification: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogType: 'website',
    ogUrl: '',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
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
    sitemapEnabled: true,
    sitemapChangeFrequency: 'weekly',
    sitemapPriority: '0.8',
    excludedPages: [],
    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',
    hotjarId: '',
    clarityProjectId: '',
    canonicalUrl: '',
    alternateLanguages: [],
    structuredDataEnabled: true,
    richSnippetsEnabled: true,
    breadcrumbsEnabled: true,
    faqSchemaEnabled: true,
    localBusinessSchemaEnabled: true,
    customHeadScripts: '',
    customBodyScripts: ''
  };
}

export function generateStructuredData(seoSettings) {
  if (!seoSettings.structuredDataEnabled) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': seoSettings.schemaType,
    name: seoSettings.schemaBusinessName || seoSettings.siteTitle,
    description: seoSettings.siteDescription,
    url: seoSettings.canonicalUrl || seoSettings.ogUrl,
  };

  if (seoSettings.schemaLogo) {
    structuredData.logo = seoSettings.schemaLogo;
  }

  if (seoSettings.schemaImage) {
    structuredData.image = seoSettings.schemaImage;
  }

  if (seoSettings.schemaPhone) {
    structuredData.telephone = seoSettings.schemaPhone;
  }

  if (seoSettings.schemaEmail) {
    structuredData.email = seoSettings.schemaEmail;
  }

  if (seoSettings.schemaAddress) {
    structuredData.address = {
      '@type': 'PostalAddress',
      streetAddress: seoSettings.schemaAddress
    };
  }

  if (seoSettings.schemaGeoLatitude && seoSettings.schemaGeoLongitude) {
    structuredData.geo = {
      '@type': 'GeoCoordinates',
      latitude: seoSettings.schemaGeoLatitude,
      longitude: seoSettings.schemaGeoLongitude
    };
  }

  if (seoSettings.schemaPriceRange) {
    structuredData.priceRange = seoSettings.schemaPriceRange;
  }

  if (seoSettings.schemaOpeningHours && seoSettings.schemaOpeningHours.length > 0) {
    structuredData.openingHours = seoSettings.schemaOpeningHours;
  }

  if (seoSettings.schemaRating && seoSettings.schemaReviewCount) {
    structuredData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: seoSettings.schemaRating,
      reviewCount: seoSettings.schemaReviewCount
    };
  }

  return structuredData;
}
