"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search, X, MapPin, Phone, Mail, Facebook, Twitter, Youtube, Instagram, Home, Users, Settings, MapIcon, BookOpen, MessageCircle, ChevronDown } from 'lucide-react'
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
  { name: 'About Us', href: '/about', icon: Users },
  { 
    name: 'Services', 
    href: '/services', 
    icon: Settings,
    hasDropdown: true,
    dropdownItems: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Mobile App Development', href: '/services/mobile-app' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
      { name: 'SEO Services', href: '/services/seo' },
      { name: 'Graphic Design', href: '/services/graphic-design' }
    ]
  },
  { 
    name: 'Services Area', 
    href: '/services-area', 
    icon: MapIcon,
    hasDropdown: true,
    dropdownItems: [
      { name: 'Kathmandu Valley', href: '/services-area/kathmandu' },
      { name: 'Pokhara', href: '/services-area/pokhara' },
      { name: 'Chitwan', href: '/services-area/chitwan' },
      { name: 'Butwal', href: '/services-area/butwal' },
      { name: 'Biratnagar', href: '/services-area/biratnagar' }
    ]
  },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Contact Us', href: '/contact', icon: MessageCircle },
]

export const NaveBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileDropdowns, setMobileDropdowns] = useState({})
  const navRef = useRef(null)

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
    // Handle search functionality here
    console.log('Searching for:', searchQuery)
  }

  const toggleMobileDropdown = (itemName) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }))
  }

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full">
      {/* Unified Top Header with Contact Info */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between space-y-2 py-2 text-xs xs:flex-row xs:h-10 xs:items-center xs:justify-between xs:space-y-0 xs:py-0">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{backgroundColor: '#1877F2'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#166FE5'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1877F2'}>
                <Facebook className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{backgroundColor: '#1DA1F2'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1A91DA'} onMouseLeave={(e) => e.target.style.backgroundColor = '#1DA1F2'}>
                <Twitter className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{backgroundColor: '#FF0000'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#E60000'} onMouseLeave={(e) => e.target.style.backgroundColor = '#FF0000'}>
                <Youtube className="w-3 h-3 text-white" />
              </div>
              <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer" style={{background: 'linear-gradient(45deg, #F56040, #E1306C, #C13584, #833AB4)'}} onMouseEnter={(e) => e.target.style.background = 'linear-gradient(45deg, #E55A3C, #D12B60, #B02F78, #7A34A8)'} onMouseLeave={(e) => e.target.style.background = 'linear-gradient(45deg, #F56040, #E1306C, #C13584, #833AB4)'}>
                <Instagram className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col md:flex-row space-x-2 xs:flex-row xs:items-center xs:space-y-0 xs:space-x-1 sm:space-x-2 lg:space-x-2 text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3" style={{color: '#544a7d'}} />
                <span className="text-[8px] xs:text-[9px] sm:text-xs lg:text-xs">Dubai, UAE</span>
              </div>
              <a href="tel:+971568011076" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <Phone className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3" style={{color: '#544a7d'}} />
                <span className="text-[8px] xs:text-[9px] sm:text-xs lg:text-xs">+971568011076</span>
              </a>
              <a href="mailto:info@marhabamovers.ae" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                  <Mail className="w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3" style={{color: '#544a7d'}} />
                  <span className="text-[8px] xs:text-[9px] sm:text-xs lg:text-xs">info@marhabamovers.ae</span>
                </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[linear-gradient(135deg,_#544a7d_0%,_#ff9a44_100%)]">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Mobile Layout */}
            <div className="lg:hidden flex items-center justify-between w-full">
              {/* Mobile Logo */}
              <Link href="/" className="flex items-center">
                <div>
                  <Image 
                    src="/images/logo.png" 
                    alt="Marhaba Furniture Movers & Packers Logo" 
                    width={120} 
                    height={60} 
                    className="rounded-lg object-contain"
                  />
                </div>
              </Link>

              {/* Mobile Search Input - Center */}
              <div className="flex-1 mx-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 w-full text-xs bg-white border-white focus:border-yellow-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white" style={{':hover': {backgroundColor: '#6b5b95'}}}>
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 bg-[linear-gradient(135deg,_#108dc7_0%,_#ef8e38_100%)]">
                    <SheetHeader>
                      <SheetTitle className="flex justify-start">
                        <Image 
                          src="/images/logo.png" 
                          alt="Marhaba Furniture Movers & Packers Logo" 
                          width={100} 
                          height={50} 
                          className="rounded-lg object-contain"
                        />
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-3">
                      
                      {/* Mobile Navigation Links */}
                      {navigationItems.map((item) => {
                        const IconComponent = item.icon;
                        
                        if (item.hasDropdown) {
                          return (
                            <div key={item.name} className="border-b border-white/20">
                              <button
                                className="flex items-center justify-between w-full text-white hover:text-yellow-100 transition-colors text-sm py-2"
                                onClick={() => toggleMobileDropdown(item.name)}
                              >
                                <div className="flex items-center space-x-2">
                                  <IconComponent className="h-4 w-4" />
                                  <span>{item.name}</span>
                                </div>
                                <ChevronDown 
                                  className={`h-4 w-4 transition-transform ${
                                    mobileDropdowns[item.name] ? 'rotate-180' : ''
                                  }`} 
                                />
                              </button>
                              
                              {/* Mobile Dropdown Items */}
                              {mobileDropdowns[item.name] && (
                                <div className="pl-6 pb-2 space-y-1">
                                  {item.dropdownItems.map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.name}
                                      href={dropdownItem.href}
                                      className="block text-white/80 hover:text-white transition-colors text-sm py-1"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {dropdownItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                        
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-2 text-white hover:text-yellow-100 transition-colors text-sm py-2 border-b border-white/20"
                            onClick={() => setIsOpen(false)}
                          >
                            <IconComponent className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Desktop Logo */}
            <Link href="/" className="hidden lg:flex items-center space-x-2">
              <div>
                <Image 
                  src="/images/logo.png" 
                  alt="Marhaba Furniture Movers & Packers Logo" 
                  width={160} 
                  height={80} 
                  className="rounded-lg object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                
                if (item.hasDropdown) {
                  return (
                    <div 
                      key={item.name} 
                      className="relative"
                    >
                      <button 
                        className="text-white font-medium text-xs hover:text-yellow-100 transition-colors uppercase tracking-wide flex items-center space-x-1"
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        <IconComponent className="h-3 w-3" />
                        <span>{item.name}</span>
                        <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white font-medium text-xs hover:text-yellow-100 transition-colors uppercase tracking-wide flex items-center space-x-1"
                  >
                    <IconComponent className="h-3 w-3" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Search Input */}
            <div className="hidden lg:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-48 text-xs bg-white border-white focus:border-yellow-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
