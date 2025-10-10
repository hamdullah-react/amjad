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
import { useDataFetching } from '@/contexts/service-areas-context'
import { SearchModal } from '../search-modal/search-modal'

// Navigation items
const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Services', href: '/services', icon: Truck },
  { name: 'Service Areas', href: '/services-area', icon: MapPin },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
]

// Social media platforms configuration
const socialPlatforms = [
  {
    key: 'facebook',
    icon: Facebook,
    label: 'Facebook'
  },
  {
    key: 'twitter',
    icon: Twitter,
    label: 'Twitter'
  },
  {
    key: 'youtube',
    icon: Youtube,
    label: 'YouTube'
  },
  {
    key: 'instagram',
    icon: Instagram,
    label: 'Instagram'
  },
  {
    key: 'linkedin',
    icon: Linkedin,
    label: 'LinkedIn'
  }
]

// Contact link configurations
const contactLinks = [
  {
    type: 'phone',
    icon: Phone,
    prefix: 'tel:',
    formatter: (value) => value.replace(/[^0-9+]/g, ''),
    display: {
      desktop: (value) => value,
      mobile: 'Call'
    }
  },
  {
    type: 'email',
    icon: Mail,
    prefix: 'mailto:',
    formatter: (value) => value,
    display: {
      desktop: (value) => value,
      mobile: null
    }
  },
  {
    type: 'location',
    icon: MapPin,
    prefix: '',
    formatter: (contactInfo) => [contactInfo.city, contactInfo.emirate].filter(Boolean).join(', '),
    display: {
      desktop: (value) => value,
      mobile: (value) => value
    }
  }
]

export const NaveBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const { contactInfo, loading: isLoadingContact } = useContact()
  const { serviceAreas } = useDataFetching()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchFocus = () => {
    setShowSearchModal(true)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setShowSearchModal(true)
  }

  // Get contact link URL
  const getContactLinkUrl = (linkConfig) => {
    if (linkConfig.type === 'location') {
      return null // Location is not a clickable link
    }
    
    const value = contactInfo[linkConfig.type]
    if (!value) return null
    
    return `${linkConfig.prefix}${linkConfig.formatter(value)}`
  }

  // Get contact link display text
  const getContactDisplayText = (linkConfig) => {
    if (linkConfig.type === 'location') {
      return linkConfig.formatter(contactInfo)
    }
    
    const value = contactInfo[linkConfig.type]
    if (!value) return null
    
    return linkConfig.display.desktop(value)
  }

  // Get mobile contact display text
  const getMobileContactDisplayText = (linkConfig) => {
    if (linkConfig.type === 'location') {
      return linkConfig.formatter(contactInfo)
    }
    
    const value = contactInfo[linkConfig.type]
    if (!value) return null
    
    return linkConfig.display.mobile || value
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
                  {contactLinks.map((linkConfig) => {
                    const IconComponent = linkConfig.icon
                    const url = getContactLinkUrl(linkConfig)
                    const displayText = getContactDisplayText(linkConfig)
                    const mobileDisplayText = getMobileContactDisplayText(linkConfig)

                    if (!displayText && !mobileDisplayText) return null

                    // For location (non-clickable)
                    if (linkConfig.type === 'location') {
                      return (
                        <div key={linkConfig.type} className="flex items-center space-x-1">
                          <IconComponent className="w-3 h-3" />
                          <span>{displayText}</span>
                        </div>
                      )
                    }

                    // For phone and email (clickable links)
                    return (
                      <Link
                        key={linkConfig.type}
                        href={url}
                        className={`flex items-center space-x-1 hover:text-blue-100 transition-colors ${
                          linkConfig.type === 'email' ? 'hidden md:flex' : 'flex'
                        }`}
                      >
                        <IconComponent className="w-3 h-3" />
                        <span className="hidden sm:inline">{displayText}</span>
                        {linkConfig.type === 'phone' && (
                          <span className="sm:hidden">{mobileDisplayText}</span>
                        )}
                      </Link>
                    )
                  })}
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
                  {socialPlatforms.map((platform) => {
                    const IconComponent = platform.icon
                    const socialUrl = contactInfo.socialLinks?.[platform.key]
                    
                    if (!socialUrl) return null

                    return (
                      <Link
                        key={platform.key}
                        href={socialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                        title={platform.label}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </Link>
                    )
                  })}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Static Content (Always Shows) */}
      <nav className={`sticky top-0 z-40 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
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
                const IconComponent = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium text-sm flex items-center space-x-2 group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* Search Bar - Static Content */}
              <div className="ml-4 relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search service areas..."
                      className="pl-10 pr-4 py-2 w-48 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all cursor-pointer"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      readOnly
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
                      const IconComponent = item.icon

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
                      )
                    })}
                  </div>

                  {/* Mobile Search */}
                  <div className="p-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        setShowSearchModal(true)
                      }}
                      className="flex items-center space-x-3 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Search className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600">Search service areas...</span>
                    </button>
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
                      <Link
                        href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center space-x-2 text-blue-600 font-semibold"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{contactInfo.phone}</span>
                      </Link>
                    ) : null}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  )
}