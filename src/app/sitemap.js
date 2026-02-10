// src/app/sitemap.js
import prisma from '@/lib/prisma';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Get SEO settings for sitemap configuration
  let seoSettings = null;
  try {
    const settings = await prisma.companySettings.findUnique({
      where: { key: 'seo_settings' }
    });
    if (settings) {
      seoSettings = settings.value;
    }
  } catch (error) {
    console.error('Error fetching SEO settings for sitemap:', error);
  }

  // If sitemap is disabled in SEO settings, return empty array
  if (seoSettings && !seoSettings.sitemapEnabled) {
    return [];
  }

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services-area`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/why-choose-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    // Fetch all dynamic data from Prisma directly
    const [blogPosts, services, serviceAreas, whyChooseUs] = await Promise.all([
      prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true },
      }).catch(() => []),
      prisma.service.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }).catch(() => []),
      prisma.serviceArea.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }).catch(() => []),
      prisma.whyChooseUs.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }).catch(() => []),
    ]);

    const dynamicPages = [
      ...blogPosts.map(post => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
      ...services.map(service => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
      ...serviceAreas.map(area => ({
        url: `${baseUrl}/services-area/${area.slug}`,
        lastModified: area.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
      ...whyChooseUs.map(item => ({
        url: `${baseUrl}/why-choose-us/${item.slug}`,
        lastModified: item.updatedAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })),
    ];

    const allPages = [...staticPages, ...dynamicPages];

    // Filter out excluded pages if specified in SEO settings
    if (seoSettings?.excludedPages?.length > 0) {
      return allPages.filter(page => {
        const path = page.url.replace(baseUrl, '');
        return !seoSettings.excludedPages.includes(path);
      });
    }

    return allPages;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
