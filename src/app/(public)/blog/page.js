import React from 'react';
import { blogPosts } from '@/data/blogData';
import BlogSection from '@/myComponents/BlogSection/BlogSection';
import PageHeader from '@/myComponents/PageHeader/PageHeader';
import { buildPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata() {
  return buildPageMetadata('blog', {
    title: 'Our Blog',
    description: 'Stay updated with the latest moving tips, industry news, and helpful guides from Marhaba Movers & Packers.',
  });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header Banner */}
      <PageHeader
        title="Our Blog"
        subtitle="Stay updated with the latest moving tips, industry news, and helpful guides"
        backgroundImage="/images/IMG-20250910-WA0020.jpg"
        breadcrumbs={[
          { label: 'Blog', href: null }
        ]}
      />

      <div className="py-12 sm:py-16 md:py-20">
        {/* Display all blog posts */}
        <BlogSection posts={blogPosts} showAll={true} />
      </div>

    </div>
  );
}
