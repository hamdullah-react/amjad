// src/app/robots.js
export default function robots() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // You can add disallow rules if needed
        disallow: ['/dashboard', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}