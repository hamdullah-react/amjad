import React from 'react';
import { CheckCircle, Award, Clock, Users, Shield, Star } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      id: 1,
      icon: CheckCircle,
      title: "100% Satisfaction Guaranteed",
      description: "We stand behind our work with a complete satisfaction guarantee on every move.",
      bgColor: "bg-blue-500"
    },
    {
      id: 2,
      icon: Award,
      title: "Licensed & Insured",
      description: "Fully licensed, bonded, and insured for your complete peace of mind.",
      bgColor: "bg-orange-500"
    },
    {
      id: 3,
      icon: Clock,
      title: "On-Time Service",
      description: "Punctual and reliable service that respects your schedule and time.",
      bgColor: "bg-blue-500"
    },
    {
      id: 4,
      icon: Users,
      title: "Professional Team",
      description: "Experienced and trained professionals who handle your belongings with care.",
      bgColor: "bg-orange-500"
    },
    {
      id: 5,
      icon: Shield,
      title: "Damage Protection",
      description: "Comprehensive protection plans to safeguard your valuable possessions.",
      bgColor: "bg-blue-500"
    },
    {
      id: 6,
      icon: Star,
      title: "5-Star Reviews",
      description: "Consistently rated 5 stars by our satisfied customers across all platforms.",
      bgColor: "bg-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <div className="inline-flex items-center justify-center w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes us the preferred choice for thousands of satisfied customers
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={reason.id}
                className="group bg-gray-50 rounded-xl shadow-lg border border-gray-100 p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 hover:bg-white"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${reason.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-[8px] sm:text-sm md:text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-[8px] sm:text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
                
                {/* Decorative element */}
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-blue-100 text-lg mb-6">
              Join thousands of satisfied customers who chose us for their moving needs
            </p>
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get Your Free Quote Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;