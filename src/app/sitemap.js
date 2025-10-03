// src/app/sitemap.js
export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  // Get SEO settings for sitemap configuration
  let seoSettings = null;
  try {
    const response = await fetch(`${baseUrl}/api/seo`);
    const data = await response.json();
    if (data.success) {
      seoSettings = data.data;
    }
  } catch (error) {
    console.error('Error fetching SEO settings for sitemap:', error);
  }

  // If sitemap is disabled in SEO settings, return empty array
  if (seoSettings && !seoSettings.sitemapEnabled) {
    return [];
  }

  const sitemapConfig = {
    changeFrequency: seoSettings?.sitemapChangeFrequency || 'weekly',
    priority: parseFloat(seoSettings?.sitemapPriority) || 0.8,
  };

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
    {
      url: `${baseUrl}/test-container`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Fetch dynamic pages from APIs
  try {
    // Fetch blog posts
    const blogPosts = await fetchDynamicPages(`${baseUrl}/api/blog`, 'blog');
    
    // Fetch services
    const services = await fetchDynamicPages(`${baseUrl}/api/services`, 'services');
    
    // Fetch service areas
    const serviceAreas = await fetchDynamicPages(`${baseUrl}/api/service-areas`, 'services-area');
    
    // Fetch why choose us pages
    const whyChooseUs = await fetchDynamicPages(`${baseUrl}/api/why-choose-us`, 'why-choose-us');

    // Combine all pages
    const allPages = [
      ...staticPages,
      ...blogPosts,
      ...services,
      ...serviceAreas,
      ...whyChooseUs,
    ];

    // Filter out excluded pages if specified in SEO settings
    const finalPages = seoSettings?.excludedPages?.length > 0 
      ? allPages.filter(page => {
          const path = page.url.replace(baseUrl, '');
          return !seoSettings.excludedPages.includes(path);
        })
      : allPages;

    return finalPages;

  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if dynamic fetching fails
    return staticPages;
  }
}

// Helper function to fetch dynamic pages from API
async function fetchDynamicPages(apiUrl, path) {
  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data && Array.isArray(data.data)) {
      return data.data.map(item => ({
        url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/${path}/${item.slug}`,
        lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return [];
  }
}