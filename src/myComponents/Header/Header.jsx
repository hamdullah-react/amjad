"use client"

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { Button } from '@/components/ui/button'
import { useHeroSlider } from '@/contexts/hero-slider-context'
import HeaderSkeleton from '@/components/layout/HeaderSkeleton'
import { ArrowRight, Truck, Package, Shield, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, zoomIn, fadeInDown } from '@/lib/animations'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// Icon mapping for string icon names from API
const iconMap = {
  'Truck': Truck,
  'Package': Package,
  'Shield': Shield,
  'Clock': Clock,
  'Users': Users
}

export const Header = () => {
  const { slides, loading } = useHeroSlider()


  if (loading) {
    return <HeaderSkeleton />
  }

  // If no slides available, return null or a placeholder
  if (!slides || slides.length === 0) {
    return <HeaderSkeleton />
  }
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => {
          // Get icon component from map or use default
          const IconComponent = iconMap[slide.icon] || Truck
          return (
            <SwiperSlide key={slide.id} className="relative">
              {/* Background Image */}
              <div className="absolute inset-0 ">
                <Image
                  src={slide.imageUrl || slide.image || '/carousel/1.jpg'}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.order === 1 || slide.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#544a7d]/70 via-[#544a7d]/50 to-[#ff9a44]/30" />
              </div>
              
              {/* Content Overlay */}
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    className="max-w-4xl mx-auto text-center text-white"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="mb-6 flex justify-center"
                      variants={zoomIn}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                      className="text-sm sm:text-base md:text-lg font-medium text-yellow-300 mb-2 uppercase tracking-wider"
                      variants={fadeInDown}
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Title */}
                    <motion.h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                      variants={fadeInUp}
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-gray-100"
                      variants={fadeInUp}
                    >
                      {slide.description}
                    </motion.p>



                    {/* CTA Buttons */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                      variants={fadeInUp}
                    >
                      {slide.buttonText && (
                        <Link href={slide.buttonUrl || '/contact'}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="lg"
                              className="bg-gradient-to-r from-[#544a7d] to-[#ff9a44] hover:from-[#483e6a] hover:to-[#f08b35] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg"
                            >
                              {slide.buttonText}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </motion.div>
                        </Link>
                      )}
                      <Link href="/about">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
                          >
                            Learn More
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 group">
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div className="swiper-button-next-custom absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 group">
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 2rem !important;
        }
        
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          margin: 0 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: #ffd452;
          transform: scale(1.2);
        }
        
        @media (max-width: 640px) {
          .swiper-pagination {
            bottom: 1rem !important;
          }
          
          .swiper-pagination-bullet-custom {
            width: 10px;
            height: 10px;
            margin: 0 4px;
          }
        }
          
      `}</style>
    </section>
  )
}