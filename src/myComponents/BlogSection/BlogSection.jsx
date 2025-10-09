"use client";
import React from 'react';
import BlogCard from '../BlogCard/BlogCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useBlog } from '@/contexts/BlogContext';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleUp } from '@/lib/animations';

const BlogSection = ({ showAll = false }) => {
  // If showAll is false, limit to 6 posts for home page
    const { posts, loading, error } = useBlog();

  const displayPosts = showAll ? posts : posts.slice(0, 8);
  
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="inline-block">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
              variants={fadeInUp}
            >
              Latest Blog Posts
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"
              variants={scaleUp}
            ></motion.div>
          </div>
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            variants={fadeInUp}
          >
            Stay updated with the latest moving tips, industry news, and helpful guides to make your relocation experience smooth and stress-free.
          </motion.p>
          {!showAll && (
            <motion.div className="mt-6" variants={fadeInUp}>
              <Link href="/blog">
                <motion.span
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  View All Posts <ArrowRight className="ml-1 h-5 w-5" />
                </motion.span>
              </Link>
            </motion.div>
          )}
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {displayPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                custom={index}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;