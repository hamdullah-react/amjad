import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  CheckCircle
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
                  Subscribe to our newsletter for exclusive deals and moving advice
                </p>
              </div>
              <div className="flex w-full md:w-auto gap-3">
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
                src="/images/logo.png"
                alt="Marhaba Furniture Movers"
                width={160}
                height={60}
                className="rounded-lg bg-white p-2"
              />
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Professional furniture moving and packing services in Dubai and across UAE.
              Licensed, insured, and committed to excellence since 2010.
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
              <a
                href="https://facebook.com/marhabamovers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com/marhabamovers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com/marhabamovers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://youtube.com/@marhabamovers"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Residential Moving', href: '/services#residential' },
                { name: 'Commercial Moving', href: '/services#commercial' },
                { name: 'Furniture Packing', href: '/services#packing' },
                { name: 'Storage Solutions', href: '/services#storage' },
                { name: 'International Moving', href: '/services#international' },
                { name: 'Furniture Assembly', href: '/services#assembly' }
              ].map((item) => (
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
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Service Areas', href: '/services-area' },
                { name: 'Pricing', href: '/services#pricing' },
                { name: 'Blog & Tips', href: '/blog' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Get Free Quote', href: '/contact#quote' }
              ].map((item) => (
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
                  <p className="text-white font-medium text-sm mb-1">Head Office</p>
                  <p className="text-gray-400 text-sm">
                    Al Qusais Industrial Area<br />
                    Dubai, United Arab Emirates
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
                  <a
                    href="tel:+971568011076"
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    +971 568 011 076
                  </a>
                  <br />
                  <a
                    href="tel:+97143334444"
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                  >
                    +971 4 333 4444
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Email Us</p>
                  <a
                    href="mailto:info@marhabamovers.ae"
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    info@marhabamovers.ae
                  </a>
                  <br />
                  <a
                    href="mailto:support@marhabamovers.ae"
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                  >
                    support@marhabamovers.ae
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Working Hours</p>
                  <p className="text-gray-400 text-sm">
                    Mon - Sat: 8:00 AM - 7:00 PM<br />
                    Sunday: 9:00 AM - 5:00 PM
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
              © {currentYear} Marhaba Furniture Movers & Packers. All rights reserved.
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                href="/terms"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/careers"
                className="text-gray-500 hover:text-orange-400 transition-colors font-medium"
              >
                We're Hiring!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;