"use client"

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { Button } from '@/components/ui/button'
import { ArrowRight, Truck, Package, Shield, Clock, Users } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    id: 1,
    title: "Professional Moving Services",
    subtitle: "Your Trusted Moving Partner",
    description: "Experience seamless relocation with our expert team. We handle your belongings with utmost care and ensure safe delivery to your new destination.",
    image: "/carousel/1.jpg",
    icon: Truck
  },
  {
    id: 2,
    title: "Secure Packing Solutions",
    subtitle: "Premium Packing Materials",
    description: "Our specialized packing services use high-quality materials to protect your valuables during transit. Every item is carefully wrapped and secured.",
    image: "/carousel/2.jpg",
    icon: Package
  },
  {
    id: 3,
    title: "Insured & Licensed",
    subtitle: "Complete Peace of Mind",
    description: "All our services are fully insured and licensed. Your belongings are protected throughout the entire moving process with comprehensive coverage.",
    image: "/carousel/3.jpg",
    icon: Shield
  },
  {
    id: 4,
    title: "24/7 Support Service",
    subtitle: "Always Here When You Need Us",
    description: "Our dedicated customer support team is available round the clock to assist you with any queries or concerns during your moving journey.",
    image: "/carousel/4.jpg",
    icon: Clock
  },
  {
    id: 5,
    title: "Expert Team",
    subtitle: "Experienced Professionals",
    description: "Our skilled and experienced team ensures your move is handled with expertise and care. We bring years of experience to make your relocation smooth.",
    image: "/carousel/5.jpg",
    icon: Users
  }
]

export const Header = () => {
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
          const IconComponent = slide.icon
          return (
            <SwiperSlide key={slide.id} className="relative">
              {/* Background Image */}
              <div className="absolute inset-0 ">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#544a7d]/70 via-[#544a7d]/50 to-[#ff9a44]/30" />
              </div>
              
              {/* Content Overlay */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto text-center text-white">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </div>
                    
                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg font-medium text-yellow-300 mb-2 uppercase tracking-wider">
                      {slide.subtitle}
                    </p>
                    
                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-gray-100">
                      {slide.description}
                    </p>
                    

                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-[#544a7d] to-[#ff9a44] hover:from-[#483e6a] hover:to-[#f08b35] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Get Free Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
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