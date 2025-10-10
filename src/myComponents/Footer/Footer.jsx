"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import FooterSkeleton from "@/components/layout/FooterSkeleton";
import { useContact } from "@/contexts/contact-context";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Truck,
  Shield,
  Award,
  CheckCircle,
  Linkedin,
} from "lucide-react";

// Social media platforms configuration
const socialPlatforms = [
  {
    key: 'facebook',
    icon: Facebook,
    label: 'Facebook',
    hoverColor: 'hover:bg-blue-600'
  },
  {
    key: 'twitter',
    icon: Twitter,
    label: 'Twitter',
    hoverColor: 'hover:bg-blue-400'
  },
  {
    key: 'instagram',
    icon: Instagram,
    label: 'Instagram',
    hoverColor: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600'
  },
  {
    key: 'youtube',
    icon: Youtube,
    label: 'YouTube',
    hoverColor: 'hover:bg-red-600'
  },
  {
    key: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    hoverColor: 'hover:bg-blue-500'
  }
];

// Services links configuration
const servicesLinks = [
  { name: "Residential Moving", href: "/services#residential" },
  { name: "Commercial Moving", href: "/services#commercial" },
  { name: "Furniture Packing", href: "/services#packing" },
  { name: "Storage Solutions", href: "/services#storage" },
  { name: "International Moving", href: "/services#international" },
  { name: "Furniture Assembly", href: "/services#assembly" },
];

// Quick links configuration
const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Service Areas", href: "/services-area" },
  { name: "Pricing", href: "/services" },
  { name: "Blog & Tips", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
  { name: "Get Free Quote", href: "/contact" },
];

// Bottom links configuration
const bottomLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Sitemap", href: "/sitemap" },
  { name: "We're Hiring!", href: "/careers", highlight: true },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { contactInfo, loading } = useContact();

  if (loading) {
    return <FooterSkeleton />;
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Get Moving Tips & Special Offers
                </h3>
                <p className="text-white/90">
                  Subscribe to our newsletter for exclusive deals and moving
                  advice
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full md:w-auto gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
                />
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src={contactInfo?.logoUrl || "/images/logo.png"}
                alt={contactInfo?.companyName || "Marhaba Furniture Movers"}
                width={160}
                height={60}
                className="rounded-lg bg-white p-2"
              />
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Professional furniture moving and packing services in{" "}
              {contactInfo?.emirate || "Dubai"} and across{" "}
              {contactInfo?.country || "UAE"}. Licensed, insured, and committed
              to excellence since 2010.
            </p>

            {/* Trust Badges */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">Licensed</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Award className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">Certified</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3">
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                const socialUrl = contactInfo?.socialLinks?.[platform.key];
                
                if (!socialUrl) return null;

                return (
                  <Link
                    key={platform.key}
                    href={socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 ${platform.hoverColor} rounded-lg flex items-center justify-center transition-all duration-300 group`}
                    title={platform.label}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <CheckCircle className="w-3 h-3 text-gray-600 group-hover:text-blue-400 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-orange-400 transition-all group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Get in Touch</h4>
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">
                    Head Office
                  </p>
                  <p className="text-gray-400 text-sm">
                    {contactInfo?.address || "Al Qusais Industrial Area"}
                    <br />
                    {[
                      contactInfo?.city,
                      contactInfo?.emirate,
                      contactInfo?.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Dubai, United Arab Emirates"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Call Us</p>
                  {contactInfo?.phone && (
                    <>
                      <Link
                        href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                      >
                        {contactInfo.phone}
                      </Link>
                      <br />
                    </>
                  )}
                  {contactInfo?.alternatePhone && (
                    <Link
                      href={`tel:${contactInfo.alternatePhone.replace(/[^0-9+]/g, "")}`}
                      className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                    >
                      {contactInfo.alternatePhone}
                    </Link>
                  )}
                  {!contactInfo?.phone && !contactInfo?.alternatePhone && (
                    <Link
                      href="tel:+971568011076"
                      className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                    >
                      +971 568 011 076
                    </Link>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">
                    Email Us
                  </p>
                  {contactInfo?.email ? (
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {contactInfo.email}
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="mailto:info@marhabamovers.ae"
                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        info@marhabamovers.ae
                      </Link>
                      <br />
                      <Link
                        href="mailto:support@marhabamovers.ae"
                        className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                      >
                        support@marhabamovers.ae
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">
                    Working Hours
                  </p>
                  <p className="text-gray-400 text-sm">
                    {contactInfo?.workingHours ? (
                      Object.entries(contactInfo.workingHours)
                        .filter(([_, hours]) => hours && hours !== "Closed")
                        .slice(0, 2)
                        .map(([day, hours], index) => (
                          <span key={day}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                            {hours}
                            {index === 0 && <br />}
                          </span>
                        ))
                    ) : (
                      <>
                        Mon - Sat: 8:00 AM - 7:00 PM
                        <br />
                        Sunday: 9:00 AM - 5:00 PM
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800 bg-black/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear}{" "}
              {contactInfo?.companyName || "Marhaba Furniture Movers & Packers"}
              . All rights reserved.
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {bottomLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-gray-500 transition-colors ${
                    link.highlight 
                      ? "hover:text-orange-400 font-medium" 
                      : "hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;