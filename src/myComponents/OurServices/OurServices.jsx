'use client';
import React from 'react';
import { Home, Truck, Package, Shield } from 'lucide-react';

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: 'Local Moving',
      description: 'Professional local moving services within the city. Our experienced team handles your belongings with care, ensuring a smooth and stress-free relocation to your new home or office.',
      icon: Home,
      colorClass: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Long Distance Moving',
      description: 'Reliable interstate and cross-country moving services. We provide comprehensive planning, secure transportation, and timely delivery for your long-distance relocation needs.',
      icon: Truck,
      colorClass: 'bg-orange-500'
    },
    {
        id: 3,
        title: 'Packing Services',
        description: 'Expert packing and unpacking services using high-quality materials. Our trained professionals ensure your items are properly protected and organized for safe transportation.',
        icon: Package,
        colorClass: 'bg-blue-500'
      },
      {
        id: 4,
        title: 'Storage Solutions',
        description: 'Secure and climate-controlled storage facilities for short-term and long-term needs. Keep your belongings safe with our monitored and accessible storage options.',
        icon: Shield,
        colorClass: 'bg-orange-500'
      }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Our Moving Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Professional moving solutions tailored to your needs. From local moves to long-distance relocations, we've got you covered with excellence and precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${service.colorClass} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-[8px]  sm:text-sm md:text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-[8px] sm:text-sm text-gray-600 leading-relaxed ">
                  {service.description}
                </p>
                
                {/* Decorative element */}
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;