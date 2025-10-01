import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock, Tag, Eye, Heart, MessageCircle } from 'lucide-react';
import PageHeader from '@/myComponents/PageHeader/PageHeader';

// Get API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Fetch blog post from your API
async function getBlogPost(slug) {
  try {
    const response = await fetch(`${API_URL}/api/blog/slug/${slug}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate static params
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blog`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    
    if (result.success && result.data && Array.isArray(result.data)) {
      return result.data
        .filter(post => 
          post && 
          post.slug && 
          typeof post.slug === 'string' &&
          (post.published !== false) && // Optional: filter published posts
          (post.status === 'published' || !post.status) // Optional: filter by status
        )
        .map((post) => ({
          slug: post.slug,
        }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating static params for blog:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || post.content?.substring(0, 160),
    keywords: post.metaKeywords?.join(', ') || '',
    openGraph: {
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || post.metaDescription || post.excerpt,
      images: post.ogImage || post.featuredImage ? [post.ogImage || post.featuredImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitterTitle || post.ogTitle || post.title,
      description: post.twitterDescription || post.ogDescription || post.excerpt,
      images: post.twitterImage || post.ogImage || post.featuredImage ? [post.twitterImage || post.ogImage || post.featuredImage] : [],
    },
  };
}

const BlogDetailPage = async ({ params }) => {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Use provided readTime or calculate
  const getReadingTime = () => {
    if (post.readTime) return post.readTime;
    if (!post.content) return '0 min';
    const wordsPerMinute = 200;
    const words = post.content.split(/\s+/).length;
    return `${Math.ceil(words / wordsPerMinute)} min`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        title={post.title}
        subtitle={post.excerpt || "Discover insights and updates from our blog"}
        backgroundImage="/images/IMG-20250910-WA0018.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: null }
        ]}
      />

      {/* Main Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
          {/* Author */}
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">
              {post.author || 'Unknown Author'}
            </span>
          </div>

          {/* Published Date */}
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
          </div>

          {/* Reading Time */}
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              {getReadingTime()} read
            </span>
          </div>

          {/* Views */}
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span className="text-sm">{post.viewCount || post.views || 0} views</span>
          </div>

          {/* Likes */}
          {post.likes > 0 && (
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{post.likes} likes</span>
            </div>
          )}
        </div>

        {/* Featured Image - Using featuredImage from API */}
        {post.featuredImage && (
          <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Featured Badge */}
            {post.isFeatured && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
            )}
          </div>
        )}

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            post.status === 'PUBLISHED' 
              ? 'bg-green-100 text-green-800'
              : post.status === 'DRAFT'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {post.status?.toLowerCase() || 'draft'}
          </span>
        </div>

        {/* Category */}
        {post.category && (
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              Category: {post.category}
            </span>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content ? (
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="text-gray-600 text-center py-12">
              <p className="text-lg">No content available for this post.</p>
            </div>
          )}
        </div>

        {/* Comments Section */}
        {post.allowComments && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
            </div>
            <p className="text-gray-600">Comments are enabled for this post.</p>
          </div>
        )}

        {/* Additional Post Information */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
            {/* Post Stats */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Post Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="capitalize font-medium">{post.status?.toLowerCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Published:</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>{formatDate(post.updatedAt)}</span>
                </div>
                {post.scheduledPublishAt && (
                  <div className="flex justify-between">
                    <span>Scheduled:</span>
                    <span>{formatDate(post.scheduledPublishAt)}</span>
                  </div>
                )}
                {post.category && (
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{post.category}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Featured:</span>
                  <span>{post.isFeatured ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            {/* Engagement Stats */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Engagement</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Views:</span>
                  <span className="font-medium">{post.viewCount || post.views || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Likes:</span>
                  <span className="font-medium">{post.likes || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reading Time:</span>
                  <span className="font-medium">{getReadingTime()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Comments:</span>
                  <span className="font-medium">{post.allowComments ? 'Enabled' : 'Disabled'}</span>
                </div>
                {post.relatedPosts && post.relatedPosts.length > 0 && (
                  <div className="flex justify-between">
                    <span>Related Posts:</span>
                    <span className="font-medium">{post.relatedPosts.length}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Canonical URL */}
          {post.canonicalUrl && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Original Source</h4>
              <a 
                href={post.canonicalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {post.canonicalUrl}
              </a>
            </div>
          )}
        </footer>
      </article>

      {/* Call to Action */}
      <section className="border-t bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Enjoyed this article?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover more insightful content in our blog collection.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore More Posts
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;