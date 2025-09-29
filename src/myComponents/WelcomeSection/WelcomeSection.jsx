'use client';

import React from 'react';
import { CheckCircle, Award, Users } from 'lucide-react';
import { useWelcome } from '@/contexts/welcome-context';
import WelcomeSkeleton from '@/components/welcome/WelcomeSkeleton';

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
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {content.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                  {content.subtitle}
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                  MOVERS & PACKERS
                </span>
              </h1>
              <div className="inline-flex items-center justify-center w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-4"></div>

              <p className="text-xl text-gray-600 leading-relaxed">
                {content.description}
              </p>

              {/* CEO Introduction */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
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
              </div>

              {/* CTA Buttons */}
              {content.buttonText && (
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a href={content.buttonUrl || '#'}>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      {content.buttonText}
                    </button>
                  </a>
                </div>
              )}
            </div>

            {/* Right Content - Features */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Choose Marhaba?
                </h3>

                <div className="space-y-6 h-[42vh] overflow-y-auto">
                  {content.features.map((feature, index) => {
                    const IconComponent = ICON_MAP[feature.icon] || CheckCircle;
                    const iconColor = index % 2 === 0 ? 'blue' : 'orange';

                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-${iconColor}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 text-${iconColor}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              {content.stats && content.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {content.stats.map((stat, index) => {
                    const gradientClass = index % 2 === 0
                      ? 'from-blue-500 to-blue-600'
                      : 'from-orange-500 to-orange-600';
                    const textColorClass = index % 2 === 0
                      ? 'text-blue-100'
                      : 'text-orange-100';

                    return (
                      <div key={index} className={`bg-gradient-to-r ${gradientClass} rounded-xl p-6 text-center text-white`}>
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className={`${textColorClass} text-sm`}>{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;