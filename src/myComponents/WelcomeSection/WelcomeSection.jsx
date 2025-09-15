import React from 'react';
import { CheckCircle, Award, Users } from 'lucide-react';

const WelcomeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Welcome To
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                  MARHABA FURNITURE
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                  MOVERS & PACKERS
                </span>
              </h1>
              <div className="inline-flex items-center justify-center w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-4"></div>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Your trusted partner for seamless furniture moving and packing services. 
                We handle your belongings with the utmost care and professionalism.
              </p>
              
              {/* CEO Introduction */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Message from our CEO</p>
                    <h3 className="text-2xl font-bold text-gray-900">Amjadullah</h3>
                    <p className="text-blue-600 font-semibold">Chief Executive Officer</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-gray-700 italic">
                  "We are committed to providing exceptional moving services that exceed your expectations. 
                  Your satisfaction is our top priority."
                </blockquote>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Learn More
                </button>
            
              </div>
            </div>
            
            {/* Right Content - Features */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Why Choose Marhaba?
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Professional Service</h4>
                      <p className="text-gray-600 text-sm">Experienced team with years of expertise in furniture moving and packing.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h4>
                      <p className="text-gray-600 text-sm">100% satisfaction guaranteed with comprehensive insurance coverage.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Customer First</h4>
                      <p className="text-gray-600 text-sm">Dedicated customer support and personalized service for every client.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-center text-white">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-blue-100 text-sm">Happy Customers</div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-center text-white">
                  <div className="text-3xl font-bold mb-2">10+</div>
                  <div className="text-orange-100 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;