"use client";
import React from 'react';
import { CheckCircle, Award, Clock, Users, Shield, Star } from 'lucide-react';
import { useWhyChooseUs } from '@/contexts/WhyChooseUsContext';
import Link from 'next/link';
import CTASection from '../CTASection/CTASection';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleUp } from '@/lib/animations';

const WhyChooseUs = ({ limit = null, showHeader = true }) => {
  const { reasons, loading, error } = useWhyChooseUs();

  // Default icons mapping
  const getIconComponent = (iconName) => {
    const iconMap = {
      'check-circle': CheckCircle,
      'award': Award,
      'clock': Clock,
      'users': Users,
      'shield': Shield,
      'star': Star,
    };
    return iconMap[iconName] || CheckCircle;
  };

  // Get color class based on order
  const getColorClass = (index) => {
    const colors = ['bg-blue-500', 'bg-orange-500', 'bg-blue-500', 'bg-orange-500', 'bg-blue-500', 'bg-orange-500'];
    return colors[index % colors.length];
  };

  // Apply limit if provided
  const displayReasons = limit ? reasons.slice(0, limit) : reasons;

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-500">Error loading content: {error}</p>
        </div>
      </section>
    );
  }

  if (!reasons || reasons.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500">No reasons available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header - Conditionally rendered */}
        {showHeader && (
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={fadeInUp}
            >
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Marhaba Furniture</span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"
              variants={scaleUp}
            ></motion.div>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Experience the difference with our professional moving services
            </motion.p>
          </motion.div>
        )}

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {displayReasons.map((reason, index) => {
            const IconComponent = getIconComponent(reason.icon);
            const colorClass = getColorClass(index);

            return (
              <motion.div key={reason.id} variants={fadeInUp}>
                <Link href={`/why-choose-us/${reason.slug}`}>
                  <motion.div
                    className="group bg-gray-50 rounded-xl shadow-lg border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:bg-white cursor-pointer"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full ${colorClass} mb-4`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="line-clamp-2 font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="line-clamp-2 text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>

                    {/* Decorative element */}
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action - Only show on limited view */}
        {limit && displayReasons.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-blue-100 text-lg mb-6">
                Discover more reasons why customers choose us
              </p>
              <Link href="/why-choose-us">
                <motion.button
                  className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Features
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Call to Action - For full page */}
        {!limit && displayReasons.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 max-w-4xl mx-auto">
             <CTASection variant="why-choose-us" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;