import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogCard = ({ post, className = '' }) => {
  // console.log("post",post)
  return (
    <div className={`bg-white rounded-md shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1 ${className}`}>
      {/* Blog Image */}
      <div className="relative h-40 sm:h-32 md:h-36 lg:h-40 w-full">
        <Image
          src={post?.featuredImage || '/default-blog.jpg'}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      {/* Blog Content */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Meta Info */}
        <div className="flex items-center text-xs text-gray-500 space-x-2">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span className="text-[8px] sm:text-xs">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span className="text-[8px] sm:text-xs">{post.author}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 line-clamp-2">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>
        
        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`} 
          className="inline-flex items-center text-[10px] sm:text-xs md:text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium mt-1"
        >
          Read More <ArrowRight className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;