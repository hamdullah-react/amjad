import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogCard = ({ post, className = '' }) => {
  return (
    <div className={`bg-white rounded-md shadow-sm overflow-hidden transition-transform hover:shadow-md ${className}`}>
      {/* Blog Image */}
      <div className="relative h-32 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Blog Content */}
      <div className="p-3 space-y-1">
        {/* Meta Info */}
        <div className="flex items-center text-xs text-gray-500 space-x-2">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span className="text-[10px]">{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span className="text-[10px]">{post.author}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-xs text-gray-600 line-clamp-1">
          {post.excerpt}
        </p>
        
        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`} 
          className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          Read More <ArrowRight className="ml-1 h-2 w-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;