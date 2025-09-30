"use client";
import React from 'react';
import BlogCard from '../BlogCard/BlogCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useBlog } from '@/contexts/BlogContext';

const BlogSection = ({ showAll = false }) => {
  // If showAll is false, limit to 6 posts for home page
    const { posts, loading, error } = useBlog();

  const displayPosts = showAll ? posts : posts.slice(0, 8);
  
  return (
    <section className=" py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Latest Blog Posts
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Stay updated with the latest moving tips, industry news, and helpful guides to make your relocation experience smooth and stress-free.
          </p>
          {!showAll && (
            <div className="mt-6">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                View All Posts <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {displayPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;