'use client';

import React from 'react';
import { CheckCircle, Award, Users } from 'lucide-react';
import { useWelcome } from '@/contexts/welcome-context';
import WelcomeSkeleton from '@/components/welcome/WelcomeSkeleton';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight, fadeInUp, staggerContainer, scaleUp } from '@/lib/animations';

const ICON_MAP = {
  CheckCircle: CheckCircle,
  Award: Award,
  Users: Users,
};

const WelcomeSection = () => {
  const { welcomeData: content, loading } = useWelcome();

  // Show skeleton while loading
  if (loading) {
    return <WelcomeSkeleton />;
  }

  // If no data from API, don't render the section
  if (!content) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >

              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                variants={fadeInLeft}
              >
                {content.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                  {content.subtitle}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                  MOVERS & PACKERS
                </span>
              </motion.h1>
              <motion.div
                className="inline-flex items-center justify-center w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-4"
                variants={fadeInLeft}
              ></motion.div>

              <motion.p
                className="text-xl text-gray-600 leading-relaxed"
                variants={fadeInLeft}
              >
                {content.description}
              </motion.p>

              {/* CEO Introduction */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                variants={scaleUp}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Message from our CEO</p>
                    <h3 className="text-2xl font-bold text-gray-900">{content.ceoName}</h3>
                    <p className="text-blue-600 font-semibold">{content.ceoPosition}</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-gray-700 italic">
                  "{content.ceoMessage}"
                </blockquote>
              </motion.div>

              {/* CTA Buttons */}
              {content.buttonText && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  variants={fadeInLeft}
                >
                  <a href={content.buttonUrl || '#'}>
                    <motion.button
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {content.buttonText}
                    </motion.button>
                  </a>
                </motion.div>
              )}
            </motion.div>

            {/* Right Content - Features */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-xl"
                variants={fadeInRight}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Choose Marhaba?
                </h3>

                <div className="space-y-6 h-[42vh] overflow-y-auto">
                  {content.features.map((feature, index) => {
                    const IconComponent = ICON_MAP[feature.icon] || CheckCircle;
                    const iconColor = index % 2 === 0 ? 'blue' : 'orange';

                    return (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: false }}
                        whileHover={{ x: 5 }}
                      >
                        <div className={`w-12 h-12 bg-${iconColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 text-${iconColor}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Stats */}
              {content.stats && content.stats.length > 0 && (
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={fadeInRight}
                >
                  {content.stats.map((stat, index) => {
                    const gradientClass = index % 2 === 0
                      ? 'from-blue-500 to-blue-600'
                      : 'from-orange-500 to-orange-600';
                    const textColorClass = index % 2 === 0
                      ? 'text-blue-100'
                      : 'text-orange-100';

                    return (
                      <motion.div
                        key={index}
                        className={`bg-gradient-to-r ${gradientClass} rounded-xl p-6 text-center text-white`}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                          viewport={{ once: false }}
                      >
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className={`${textColorClass} text-sm`}>{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;