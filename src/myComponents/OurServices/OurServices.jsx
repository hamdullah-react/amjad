'use client';
import React from 'react';
import { Home, Truck, Package, Shield } from 'lucide-react';
import { useServices } from '@/contexts/ServicesContext';
import Link from 'next/link';


const OurServices = () => {
  const { services, loading, error } = useServices();

  // Default icons mapping
  const getServiceIcon = (service) => {
    const iconMap = {
      'local moving': Home,
      'long distance': Truck,
      'packing': Package,
      'storage': Shield,
    };
    
    const lowerTitle = service.title.toLowerCase();
    const matchedIcon = Object.entries(iconMap).find(([key]) => lowerTitle.includes(key));
    return matchedIcon ? matchedIcon[1] : Home;
  };

  // Get color class
  const getColorClass = (index) => {
    const colors = ['bg-blue-500', 'bg-orange-500', 'bg-blue-500', 'bg-orange-500'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-red-500">Error loading services: {error}</p>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500">No services available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
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
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service);
            const colorClass = getColorClass(index);

            // console.log("service",service)
            
            return (
              <Link
               href={`/services/${service?.slug}`}
                key={service.id}
                className="group bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorClass} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="line-clamp-2 text-gray-600 leading-relaxed">
                  {service.shortDesc || service.description}
                </p>
                
                {/* Decorative element */}
                <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;