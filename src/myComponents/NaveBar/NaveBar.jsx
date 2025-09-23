"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavBarSkeleton from '@/components/layout/NavBarSkeleton'
import { useContact } from '@/contexts/contact-context'
import { Menu, Search, X, MapPin, Phone, Mail, Facebook, Twitter, Youtube, Instagram, Home, Users, Settings, MapIcon, BookOpen, MessageCircle, ChevronDown, Truck, Shield, Clock, Award, Linkedin } from 'lucide-react'
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
  {
    name: 'Services',
    href: '/services',
    icon: Truck,
    hasDropdown: true,
    dropdownItems: [
      { name: 'Furniture Moving', href: '/services#furniture', icon: Truck },
      { name: 'Packing Services', href: '/services#packing', icon: Shield },
      { name: 'Storage Solutions', href: '/services#storage', icon: Clock },
      { name: 'Office Relocation', href: '/services#office', icon: Award },
    ]
  },
  {
    name: 'Service Areas',
    href: '/services-area',
    icon: MapIcon,
    hasDropdown: true,
    dropdownItems: [
      { name: 'Dubai', href: '/services-area#dubai', icon: MapPin },
      { name: 'Abu Dhabi', href: '/services-area#abudhabi', icon: MapPin },
      { name: 'Sharjah', href: '/services-area#sharjah', icon: MapPin },
      { name: 'Northern Emirates', href: '/services-area#northern', icon: MapPin },
    ]
  },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Contact', href: '/contact', icon: MessageCircle },
]

export const NaveBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdowns, setMobileDropdowns] = useState({})
  const [isScrolled, setIsScrolled] = useState(false)
  const { contactInfo, loading: isLoadingContact } = useContact()
  const navRef = useRef(null)

  // console.log("contactInfo",contactInfo)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const toggleMobileDropdown = (itemName) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }))
  }

  if (isLoadingContact) {
    return <NavBarSkeleton />
  }

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-xs">
            {/* Left - Contact Info */}
            <div className="flex items-center space-x-4">
              {contactInfo?.phone && (
                <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center space-x-1 hover:text-blue-100 transition-colors">
                  <Phone className="w-3 h-3" />
                  <span className="hidden sm:inline">{contactInfo.phone}</span>
                  <span className="sm:hidden">Call</span>
                </a>
              )}
              {contactInfo?.email && (
                <a href={`mailto:${contactInfo.email}`} className="hidden md:flex items-center space-x-1 hover:text-blue-100 transition-colors">
                  <Mail className="w-3 h-3" />
                  <span>{contactInfo.email}</span>
                </a>
              )}
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{[contactInfo?.city, contactInfo?.emirate].filter(Boolean).join(', ') || 'Dubai, UAE'}</span>
              </div>
            </div>

            {/* Right - Social Icons */}
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline mr-2 text-white/80">Follow us:</span>
              {contactInfo?.socialLinks?.facebook && (
                <a href={contactInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {contactInfo?.socialLinks?.twitter && (
                <a href={contactInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {contactInfo?.socialLinks?.youtube && (
                <a href={contactInfo.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              )}
              {contactInfo?.socialLinks?.instagram && (
                <a href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {contactInfo?.socialLinks?.linkedin && (
                <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav ref={navRef} className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={contactInfo?.logoUrl|| "/images/logo.png"}
                alt={contactInfo?.companyName || "Marhaba Furniture Movers"}
                width={140}
                height={50}
                className="object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;

                if (item.hasDropdown) {
                  return (
                    <div key={item.name} className="relative">
                      <button
                        className=" py-2 px-1 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium text-sm flex items-center space-x-2 group"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>{item.name}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full left-5 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 transform origin-top ${
                          activeDropdown === item.name ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                        }`}
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className={`${item.dropdownItems.length > 3 ? 'max-h-[165px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100' : ''}`}>
                          {item.dropdownItems.map((dropdownItem, index) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="flex items-center space-x-3 px-4 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors group"
                              >
                                {DropdownIcon && <DropdownIcon className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />}
                                <span className="text-sm">{dropdownItem.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                        {item.dropdownItems.length > 3 && (
                          <div className="border-t border-gray-100 mt-1 pt-1 px-4 pb-1">
                            <p className="text-xs text-gray-400 text-center">Scroll for more</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

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

              {/* Search Bar */}
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

            {/* Mobile Menu Button */}
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
                        src={contactInfo?.logos?.primary || "/images/logo.png"}
                        alt={contactInfo?.companyName || "Marhaba Furniture Movers"}
                        width={140}
                        height={50}
                        className="object-contain bg-white p-2 rounded"
                      />
                    </SheetTitle>
                  </div>

        

                  {/* Mobile Navigation Links */}
                  <div className="py-4">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon;

                      if (item.hasDropdown) {
                        return (
                          <div key={item.name} className="border-b border-gray-100">
                            <button
                              className="flex items-center justify-between w-full px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => toggleMobileDropdown(item.name)}
                            >
                              <div className="flex items-center space-x-3">
                                <IconComponent className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform text-gray-400 ${
                                  mobileDropdowns[item.name] ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {/* Mobile Dropdown Items */}
                            {mobileDropdowns[item.name] && (
                              <div className="bg-gray-50 py-2">
                                <div className={`${item.dropdownItems.length > 3 ? 'max-h-[132px] overflow-y-auto' : ''}`}>
                                  {item.dropdownItems.map((dropdownItem) => {
                                    const DropdownIcon = dropdownItem.icon;
                                    return (
                                      <Link
                                        key={dropdownItem.name}
                                        href={dropdownItem.href}
                                        className="flex items-center space-x-3 px-10 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-white transition-colors"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {DropdownIcon && <DropdownIcon className="w-4 h-4 text-blue-500" />}
                                        <span className="text-sm">{dropdownItem.name}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                                {item.dropdownItems.length > 3 && (
                                  <div className="px-10 pt-1">
                                    <p className="text-xs text-gray-400">Scroll for more</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }

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

          
                  {/* Mobile Contact Info */}
                  <div className="p-4 bg-gray-50 border-t">
                    <p className="text-xs text-gray-500 mb-2">Need Help?</p>
                    {contactInfo?.phone ? (
                      <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center space-x-2 text-blue-600 font-semibold">
                        <Phone className="w-4 h-4" />
                        <span>{contactInfo.phone}</span>
                      </a>
                    ) : (
                      <a href="tel:+971568011076" className="flex items-center space-x-2 text-blue-600 font-semibold">
                        <Phone className="w-4 h-4" />
                        <span>+971 568 011 076</span>
                      </a>
                    )}
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