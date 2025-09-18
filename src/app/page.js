import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, Users, Globe, Zap, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/myComponents/Header/Header'
import  OurServices  from '@/myComponents/OurServices/OurServices'
import WhyChooseUs from '@/myComponents/WhyChooseUs/WhyChooseUs'
import WelcomeSection from '@/myComponents/WelcomeSection/WelcomeSection'
import BlogSection from '@/myComponents/BlogSection/BlogSection'
import { blogPosts } from '@/data/blogData'


export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Lightning-fast performance with 99.9% uptime guarantee"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced professionals dedicated to your success"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving clients worldwide with 24/7 support"
    }
  ]

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
      <WhyChooseUs />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Marhaba Furniture</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our professional moving services
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-orange-50 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-[8px] sm:text-sm md:text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-[8px] sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-600">
        <div className="container mx-auto px-4">
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
      <BlogSection posts={blogPosts} />
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Move with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Confidence?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get your free quote today and experience the Marhaba difference. 
              Our expert team is ready to handle your move with care and professionalism.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300" asChild>
                <a href="tel:+971568011076">
                  Call Now: +971568011076
                  <Phone className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
