"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useContact } from '@/contexts/contact-context'
import { Menu, Search, X, MapPin, Phone, Mail, Facebook, Twitter, Youtube, Instagram, Home, Users, BookOpen, MessageCircle, Truck, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Services', href: '/services', icon: Truck },
  { name: 'Service Areas', href: '/services-area', icon: MapPin },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
]

export const NaveBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { contactInfo, loading: isLoadingContact } = useContact()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <>
      {/* Top Info Bar - Dynamic Content with Loading State */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-xs">
            {/* Left - Contact Info */}
            <div className="flex items-center space-x-4">
              {isLoadingContact ? (
                // Loading state for contact info
                <>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-white/30 rounded animate-pulse"></div>
                    <div className="w-20 h-3 bg-white/30 rounded animate-pulse hidden sm:block"></div>
                    <div className="w-8 h-3 bg-white/30 rounded animate-pulse sm:hidden"></div>
                  </div>
                  <div className="hidden md:flex items-center space-x-1">
                    <div className="w-3 h-3 bg-white/30 rounded animate-pulse"></div>
                    <div className="w-24 h-3 bg-white/30 rounded animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-white/30 rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-white/30 rounded animate-pulse"></div>
                  </div>
                </>
              ) : contactInfo ? (
                // Dynamic content when loaded
                <>
                  {contactInfo.phone && (
                    <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center space-x-1 hover:text-blue-100 transition-colors">
                      <Phone className="w-3 h-3" />
                      <span className="hidden sm:inline">{contactInfo.phone}</span>
                      <span className="sm:hidden">Call</span>
                    </a>
                  )}
                  {contactInfo.email && (
                    <a href={`mailto:${contactInfo.email}`} className="hidden md:flex items-center space-x-1 hover:text-blue-100 transition-colors">
                      <Mail className="w-3 h-3" />
                      <span>{contactInfo.email}</span>
                    </a>
                  )}
                  {(contactInfo.city || contactInfo.emirate) && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{[contactInfo.city, contactInfo.emirate].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/* Right - Social Icons */}
            <div className="flex items-center space-x-2">
              {isLoadingContact ? (
                // Loading state for social icons
                <>
                  <div className="hidden sm:block w-12 h-3 bg-white/30 rounded animate-pulse mr-2"></div>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="w-7 h-7 bg-white/30 rounded-full animate-pulse"></div>
                  ))}
                </>
              ) : contactInfo ? (
                // Dynamic content when loaded
                <>
                  <span className="hidden sm:inline mr-2 text-white/80">Follow us:</span>
                  {contactInfo.socialLinks?.facebook && (
                    <a href={contactInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contactInfo.socialLinks?.twitter && (
                    <a href={contactInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contactInfo.socialLinks?.youtube && (
                    <a href={contactInfo.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contactInfo.socialLinks?.instagram && (
                    <a href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {contactInfo.socialLinks?.linkedin && (
                    <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Static Content (Always Shows) */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo - Static with dynamic fallback */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={contactInfo?.logoUrl || "/images/logo.png"}
                alt={contactInfo?.companyName || "Marhaba Furniture Movers"}
                width={140}
                height={50}
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation - Static Content */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium text-sm flex items-center space-x-2 group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Search Bar - Static Content */}
              <div className="ml-4 relative">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 w-48 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Mobile Menu Button - Static Content */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="bg-gradient-to-br from-blue-600 to-orange-600 p-6">
                    <SheetTitle>
                      <Image
                        src={contactInfo?.logoUrl || "/images/logo.png"}
                        alt={contactInfo?.companyName || "Marhaba Furniture Movers"}
                        width={140}
                        height={50}
                        className="object-contain bg-white p-2 rounded"
                      />
                    </SheetTitle>
                  </div>

                  {/* Mobile Navigation Links - Static Content */}
                  <div className="py-4">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon;

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          <IconComponent className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Contact Info - Dynamic with Loading */}
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-xs text-gray-500 mb-2">Need Help?</p>
                    {isLoadingContact ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    ) : contactInfo?.phone ? (
                      <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center space-x-2 text-blue-600 font-semibold">
                        <Phone className="w-4 h-4" />
                        <span>{contactInfo.phone}</span>
                      </a>
                    ) : null}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}