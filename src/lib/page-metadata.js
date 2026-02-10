// src/lib/page-metadata.js
import prisma from '@/lib/prisma';

/**
 * Builds Next.js metadata object from per-page SeoSettings and global defaults
 */
export async function buildPageMetadata(pageName, defaults = {}) {
  try {
    const pageSeo = await prisma.seoSettings.findUnique({
      where: { page: pageName }
    });

    if (pageSeo) {
      return {
        title: pageSeo.title || defaults.title,
        description: pageSeo.description || defaults.description,
        keywords: pageSeo.keywords || defaults.keywords || '',
        openGraph: {
          title: pageSeo.ogTitle || pageSeo.title || defaults.title,
          description: pageSeo.ogDescription || pageSeo.description || defaults.description,
          images: pageSeo.ogImage ? [pageSeo.ogImage] : [],
          type: 'website',
        },
        alternates: pageSeo.canonical ? { canonical: pageSeo.canonical } : undefined,
      };
    }
  } catch (error) {
    console.error(`Error fetching page SEO for ${pageName}:`, error);
  }

  // Return defaults if no per-page SEO found
  return {
    title: defaults.title,
    description: defaults.description,
    keywords: defaults.keywords || '',
  };
}
