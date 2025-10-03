// src/lib/seo.js

export async function getSEOSettings() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/seo`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch SEO settings');
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    }
    
    throw new Error('No SEO settings found');
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    throw error; // Re-throw the error instead of falling back to defaults
  }
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

  // Add optional properties if they exist
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