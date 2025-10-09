'use client';
import React from 'react';
import { Home, Truck, Package, Shield } from 'lucide-react';
import { useServices } from '@/contexts/ServicesContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleUp } from '@/lib/animations';


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
              className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
              variants={fadeInUp}
            >
              Our Moving Services
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"
              variants={scaleUp}
            ></motion.div>
          </div>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            variants={fadeInUp}
          >
            Professional moving solutions tailored to your needs. From local moves to long-distance relocations, we've got you covered with excellence and precision.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service);
            const colorClass = getColorClass(index);

            // console.log("service",service)

            return (
              <motion.div key={service.id} variants={fadeInUp}>
                <Link href={`/services/${service?.slug}`}>
                  <motion.div
                    className="group bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center transition-all duration-300 hover:shadow-xl hover:border-blue-200 cursor-pointer"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorClass} mb-4`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="line-clamp-2 text-gray-600 leading-relaxed">
                      {service.shortDesc || service.description}
                    </p>

                    {/* Decorative element */}
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;