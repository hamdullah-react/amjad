'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Users, Globe, Zap, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/myComponents/Header/Header'
import  OurServices  from '@/myComponents/OurServices/OurServices'
import WhyChooseUs from '@/myComponents/WhyChooseUs/WhyChooseUs'
import WelcomeSection from '@/myComponents/WelcomeSection/WelcomeSection'
import BlogSection from '@/myComponents/BlogSection/BlogSection'
import CTASection from '@/myComponents/CTASection/CTASection'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function Home() {
  const [stats, setStats] = useState([])
  const [statsError, setStatsError] = useState(false)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/statistics')
        const data = await res.json()
        if (data.success) {
          setStats(data.data)
        } else {
          setStatsError(true)
        }
      } catch (error) {
        setStatsError(true)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header with Carousel */}
      <Header />

      {/* Welcome Section */}
      <WelcomeSection />


      <OurServices/>


      {/* Why Choose Us Section */}
      <WhyChooseUs limit={3} showHeader={true} />


      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id || index}
                  className="text-center text-white"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.prefix || ''}{stat.value}{stat.suffix || ''}
                  </div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      <BlogSection  />

      {/* CTA Section */}

      <CTASection variant="home" />

    </div>
  )
}
