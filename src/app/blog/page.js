import React from 'react';
import { blogPosts } from '@/data/blogData';
import BlogSection from '@/myComponents/BlogSection/BlogSection';

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Blog</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest moving tips, industry news, and helpful guides
          </p>
        </div>
      </div>
      
      {/* Display all blog posts */}
      <BlogSection posts={blogPosts} showAll={true} />
    </div>
  );
}