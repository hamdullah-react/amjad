import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Users, Globe, Zap, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/myComponents/Header/Header'
import  OurServices  from '@/myComponents/OurServices/OurServices'
import WhyChooseUs from '@/myComponents/WhyChooseUs/WhyChooseUs'
import WelcomeSection from '@/myComponents/WelcomeSection/WelcomeSection'
import BlogSection from '@/myComponents/BlogSection/BlogSection'
import CTASection from '@/myComponents/CTASection/CTASection'



export default function Home() {


  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "1000+", label: "Projects Completed" },
    { number: "50+", label: "Countries Served" },
    { number: "24/7", label: "Support Available" }
  ]

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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <BlogSection  />
      
      {/* CTA Section */}

      <CTASection variant="home" />
      
    </div>
  )
}
