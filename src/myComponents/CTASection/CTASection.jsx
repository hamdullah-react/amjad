"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, ArrowLeft } from 'lucide-react';
import { useContact } from '@/contexts/contact-context';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

/**
 * Reusable CTA Section Component
 * 
 * @param {Object} props
 * @param {string} props.variant - Type of CTA: 'home' | 'about' | 'blog' | 'services' | 'services-dynamic' | 'service-areas' | 'service-areas-dynamic' | 'why-choose-us' | 'why-choose-us-dynamic'
 * @param {string} props.title - Main heading text
 * @param {string} props.subtitle - Subtitle/description text
 * @param {string} props.phoneNumber - Phone number for call buttons (will use contact context if available)
 * @param {Object} props.buttons - Custom button configuration
 * @param {string} props.className - Additional CSS classes
 */
const CTASection = ({ 
  variant = 'home', 
  title, 
  subtitle, 
  phoneNumber,
  buttons,
  className = '' 
}) => {
  const { contactInfo, loading: isLoadingContact } = useContact();
  
  // Use contact context phone numbers if available, otherwise use prop or default
  const primaryPhone = phoneNumber || contactInfo?.whatsapp || contactInfo?.phone ;
  const alternatePhone = contactInfo?.alternatePhone;

  // Default configurations for each variant
  const configs = {
    home: {
      title: title || "Ready to Move with Confidence?",
      subtitle: subtitle || "Get your free quote today and experience the Marhaba difference. Our expert team is ready to handle your move with care and professionalism.",
      background: "bg-gray-50",
      layout: "section",
      buttons: buttons || {
        primary: { text: "Get Free Quote", href: "/contact", icon: ArrowRight },
        secondary: { text: `Call Now: ${primaryPhone}`, href: `tel:${primaryPhone}`, icon: Phone }
      }
    },
    about: {
      title: title || "Ready to Experience the Marhaba Difference?",
      subtitle: subtitle || "Join thousands of satisfied customers who trust us with their furniture moving needs.",
      background: "bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-3xl",
      layout: "centered",
      buttons: buttons || {
        primary: { text: "Get Free Quote", href: "/contact" },
        secondary: { text: `Call: ${primaryPhone}`, href: `tel:${primaryPhone}` }
      }
    },
    blog: {
      title: title || "Stay Updated with Our Latest Insights",
      subtitle: subtitle || "Subscribe to our newsletter for moving tips, industry news, and exclusive offers.",
      background: "bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-2xl",
      layout: "centered",
      buttons: buttons || {
        primary: { text: "Subscribe Now", href: "#" },
        secondary: { text: "Browse All Articles", href: "/blog" }
      }
    },
    services: {
      title: title || "Ready to Move?",
      subtitle: subtitle || "Get a free quote today and experience stress-free furniture moving with Marhaba",
      background: "",
      layout: "centered",
      buttons: buttons || {
        primary: { text: "Get Free Quote", href: "/contact" },
        secondary: { text: `Call: ${primaryPhone}`, href: `tel:${primaryPhone}` }
      }
    },
    'services-dynamic': {
      title: title || "Need Other Services?",
      subtitle: subtitle || "We offer a complete range of furniture moving and packing services to meet all your needs",
      background: "",
      layout: "centered",
      buttons: buttons || {
        primary: { text: "View All Services", href: "/services" },
        secondary: { text: "Contact Us", href: "/contact" }
      }
    },
    'service-areas': {
      title: title || "Need Service in Your Area?",
      subtitle: subtitle || "Contact us to check availability in your location or schedule a custom moving service.",
      background: "bg-transparent",
      layout: "centered",
      buttons: buttons || {
        primary: { text: "Check Availability", href: "/contact" },
        secondary: { text: `Call: ${primaryPhone}`, href: `tel:${primaryPhone}` }
      }
    },
    'service-areas-dynamic': {
      title: title || "Explore Other Areas",
      subtitle: subtitle || "We provide comprehensive furniture moving services across all UAE Emirates with local expertise",
      background: "",
      layout: "centered",
      buttons: buttons || {
        primary: { text: "View All Areas", href: "/service-areas" },
        secondary: { text: "Contact Us", href: "/contact" }
      }
    },
    'why-choose-us': {
      title: title || "Ready to Experience the Difference?",
      subtitle: subtitle || "Join thousands of satisfied customers who chose us for their moving needs",
      background: "bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl text-white",
      layout: "centered",
      buttons: buttons || {
        primary: { text: "Get Your Free Quote Today", href: "/contact" }
      }
    },
    'why-choose-us-dynamic': {
      title: title || "Other Reasons to Choose Us",
      subtitle: subtitle || "Explore all our features on the main Why Choose Us page.",
      background: "bg-transparent",
      layout: "centered-simple",
      buttons: buttons || {
        primary: { text: "View All Features", href: "/why-choose-us", icon: ArrowLeft }
      }
    }
  };

  const config = configs[variant] || configs.home;

  // Render button component
  const renderButton = (button, isPrimary = true) => {
    const ButtonIcon = button.icon;
    
    if (isPrimary) {
      return (
        <Link
          href={button.href}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          {button.text}
          {ButtonIcon && <ButtonIcon className="w-5 h-5" />}
        </Link>
      );
    } else {
      return (
        <Link
          href={button.href}
          className="border-2 border-orange-500 text-orange-600 px-6 md:px-8 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2"
        >
          {button.text}
          {ButtonIcon && <ButtonIcon className="w-5 h-5" />}
        </Link>
      );
    }
  };

  // Different layout renderers
  const renderSectionLayout = () => (
    <section className={`py-20 ${config.background} ${className} overflow-hidden`}>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-6"
            variants={fadeInUp}
          >
            {config.title.includes('Confidence?') ? (
              <>
                Ready to Move with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Confidence?</span>
              </>
            ) : (
              config.title
            )}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            {config.subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            {config.buttons.primary && renderButton(config.buttons.primary, true)}
            {config.buttons.secondary && renderButton(config.buttons.secondary, false)}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

  const renderCenteredLayout = () => (
    <motion.div
      className={`${config.background} p-8 md:p-12 text-center ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.h2
        className={`text-2xl md:text-3xl font-bold mb-4 ${config.background.includes('gradient') ? 'text-white' : 'text-gray-900'}`}
        variants={fadeInUp}
      >
        {config.title}
      </motion.h2>
      <motion.p
        className={`text-lg mb-8 max-w-2xl mx-auto ${
          config.background.includes('gradient') ? 'text-white/90' : 'text-gray-600'
        }`}
        variants={fadeInUp}
      >
        {config.subtitle}
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        variants={fadeInUp}
      >
        {config.buttons.primary && renderButton(config.buttons.primary, true)}
        {config.buttons.secondary && renderButton(config.buttons.secondary, false)}
      </motion.div>
    </motion.div>
  );

  const renderCenteredSimpleLayout = () => (
    <motion.div
      className={`text-center ${config.background} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.h2
        className="text-3xl font-bold text-gray-900 mb-4"
        variants={fadeInUp}
      >
        {config.title}
      </motion.h2>
      <motion.p
        className="text-gray-600 mb-4 max-w-2xl mx-auto"
        variants={fadeInUp}
      >
        {config.subtitle}
      </motion.p>
      <motion.div
        className="flex justify-center"
        variants={fadeInUp}
      >
        {config.buttons.primary && (
          <Link
            href={config.buttons.primary.href}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            {config.buttons.primary.icon && <config.buttons.primary.icon className="w-4 h-4" />}
            {config.buttons.primary.text}
          </Link>
        )}
      </motion.div>
    </motion.div>
  );

  // Show loading state if contact info is still loading
  if (isLoadingContact) {
    return (
      <div className={`py-12 ${config.background} ${className}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-6"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 bg-gray-300 rounded w-40 mx-auto"></div>
              <div className="h-12 bg-gray-300 rounded w-40 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render based on layout type
  switch (config.layout) {
    case 'section':
      return renderSectionLayout();
    case 'centered-simple':
      return renderCenteredSimpleLayout();
    case 'centered':
    default:
      return renderCenteredLayout();
  }
};

export default CTASection;