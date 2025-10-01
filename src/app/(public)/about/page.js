"use client"
import Image from 'next/image'
import { CheckCircle2, Clock, Truck, Users, Award, Target, Heart, Star, TrendingUp, Shield, Trophy, Eye, Calendar } from 'lucide-react'
import { useAbout } from '@/contexts/AboutContext'
import PageHeader from '@/myComponents/PageHeader/PageHeader'

import { 
  StatsSkeleton, 
  StorySkeleton, 
  MissionVisionSkeleton, 
  ValuesSkeleton
} from './AboutSkeletons'
import TeamSection from '@/myComponents/TeamSection/TeamSection'
import CTASection from '@/myComponents/CTASection/CTASection'

export default function AboutPage() {
  const { aboutData, loading, error } = useAbout()
  console.log("object", aboutData)

  if (loading) {
    return (
      <div>
        {/* Page Header Banner */}
        <PageHeader
          title="About Us"
          subtitle="Loading..."
          backgroundImage="/images/IMG-20250910-WA0016.jpg"
          breadcrumbs={[
            { label: 'About', href: null }
          ]}
        />

        {/* Stats Section Skeleton */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12">
          <div className="absolute inset-0 bg-white/40"></div>
          <div className="max-w-6xl mx-auto px-4">
            <StatsSkeleton />
          </div>
        </section>

        {/* Main Content Skeleton */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 space-y-20">
            
            {/* Story Section Skeleton */}
            <div>
              <div className="text-center mb-8">
                <div className="w-24 h-1 bg-gray-200 mx-auto mb-3"></div>
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto"></div>
              </div>
              <StorySkeleton />
            </div>

            {/* Mission & Vision Skeleton */}
            <div>
              <MissionVisionSkeleton />
            </div>

            {/* Core Values Skeleton */}
            <div>
              <div className="text-center mb-12">
                <div className="w-24 h-1 bg-gray-200 mx-auto mb-3"></div>
                <div className="h-10 w-64 bg-gray-200 rounded mx-auto"></div>
              </div>
              <ValuesSkeleton />
            </div>

            {/* Team Section - Always visible, no skeleton needed */}
            <TeamSection />

            {/* CTA Skeleton */}
            <div className="bg-gray-200 rounded-3xl p-12">
              <div className="h-10 w-96 bg-gray-300 rounded mx-auto mb-4"></div>
              <div className="h-6 w-80 bg-gray-300 rounded mx-auto mb-8"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
                <div className="h-12 w-32 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading content</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-xl mb-4">No data available</div>
        </div>
      </div>
    )
  }

  // Extract data from the API response structure
  const data = aboutData.data || aboutData

  // Map API data to match your structure
  const stats = [
    { number: `${data.yearsExperience}+`, label: "Years Experience", icon: "calendar" },
    { number: `${data.happyCustomers}+`, label: "Happy Customers", icon: "users" },
    { number: `${data.movesCompleted}+`, label: "Successful Moves", icon: "truck" },
    { number: data.satisfaction, label: "Satisfaction Rate", icon: "trophy" }
  ]

  const iconMap = {
    users: Users,
    shield: Shield,
    trophy: Award,
    innovation: TrendingUp,
    calendar: Clock,
    target: Target,
    heart: Heart,
    truck: Truck,
    eye: Eye
  }

  return (
    <div>
      {/* Page Header Banner */}
      <PageHeader
        title="About Us"
        subtitle="Your trusted partner for all furniture moving needs in Dubai and across the UAE"
        backgroundImage={data.images?.hero || "/images/IMG-20250910-WA0016.jpg"}
        breadcrumbs={[
          { label: 'About', href: null }
        ]}
      />

      {/* Stats Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Users;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                    {stat.number}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">

          {/* Our Story Section */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Story</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {data.story?.content?.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {/* Timeline */}
                <div className="mt-8">
                  <h3 className="font-bold text-xl mb-6 text-gray-800">Our Journey</h3>
                  <div className="space-y-4">
                    {data.journey?.map((milestone, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-20 font-bold text-blue-600">{milestone.year}</div>
                        <div className="flex-1">
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mt-1.5 mr-4 float-left"></div>
                          <p className="text-gray-600">{milestone.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={data.images?.vision || "/images/IMG-20250910-WA0020.jpg"}
                        alt="Marhaba Team"
                        fill
                        style={{objectFit: "cover"}}
                        className="hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative h-56 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={data.images?.story || "/images/IMG-20250910-WA0021.jpg"}
                        alt="Moving Service"
                        fill
                        style={{objectFit: "cover"}}
                        className="hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="relative h-56 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={data.images?.mission || "/images/IMG-20250910-WA0022.jpg"}
                        alt="Professional Packing"
                        fill
                        style={{objectFit: "cover"}}
                        className="hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={data.images?.team || "/images/IMG-20250910-WA0023.jpg"}
                        alt="Happy Customers"
                        fill
                        style={{objectFit: "cover"}}
                        className="hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
                  <span className="font-bold">{data.yearsExperience}+ Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 p-8 md:p-10 rounded-3xl text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Target className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="mb-6 text-white/90">
                    {data.mission?.description}
                  </p>
                  <ul className="space-y-3">
                    {data.mission?.points?.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-yellow-300" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-orange-600 to-orange-400 p-8 md:p-10 rounded-3xl text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <Award className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
                  <p className="mb-6 text-white/90">
                    {data.vision?.description}
                  </p>
                  <ul className="space-y-3">
                    {data.vision?.points?.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Star className="w-5 h-5 mr-3 text-yellow-300" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Values</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {data.coreValues?.map((value, index) => {
                const IconComponent = iconMap[value.icon] || Heart;
                return (
                  <div key={index} className="group">
                    <div className="bg-white rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-7 h-7 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Section - Separate Component */}
          <TeamSection />

          {/* CTA Section */}
   

          <CTASection variant="about" />
        </div>
      </section>
    </div>
  )
}