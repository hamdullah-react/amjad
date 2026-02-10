// src/app/robots.js
import prisma from '@/lib/prisma';

export default async function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  let robotsDirective = 'index, follow';
  try {
    const settings = await prisma.companySettings.findUnique({
      where: { key: 'seo_settings' }
    });
    if (settings?.value?.robots) {
      robotsDirective = settings.value.robots;
    }
  } catch (error) {
    console.error('Error fetching robots settings:', error);
  }

  const isNoIndex = robotsDirective.includes('noindex');
  const isNoFollow = robotsDirective.includes('nofollow');

  return {
    rules: [
      {
        userAgent: '*',
        allow: isNoIndex ? undefined : '/',
        disallow: isNoIndex ? '/' : ['/dashboard', '/api', '/auth'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
