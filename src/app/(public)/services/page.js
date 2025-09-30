'use client'

import { useServices } from '@/contexts/ServicesContext'
import PageHeader from '@/myComponents/PageHeader/PageHeader'
import { Truck, Package, Home, Users, Shield, Clock, Loader2 } from 'lucide-react'
import Link from 'next/link'
import ServiceCardSkeleton from './ServiceCardSkeleton'

// Fallback icon mapping for services
const iconMap = {
  'truck': Truck,
  'package': Package,
  'home': Home,
  'users': Users,
  'shield': Shield,
  'clock': Clock,
  'default': Package
}

// Skeleton Loading Component


export default function ServicesPage() {
  const { services, loading, error } = useServices()

  // Transform API data to match component structure
  const transformServiceData = (service) => {
    const iconName = service?.icon?.toLowerCase() || 'default'
    const IconComponent = iconMap[iconName] || iconMap.default
    
    return {
      icon: IconComponent,
      title: service.title || 'Service',
      description: service.description || service.shortDesc || 'Professional service',
      features: service.features && service.features.length > 0 
        ? service.features 
        : ['Professional service', 'Quality guarantee', 'Expert team', 'Customer support']
    }
  }

  // Use API data only
  const displayServices = services && services.length > 0 
    ? services.map(transformServiceData)
    : []

  return (
    <div>
      {/* Page Header Banner */}
      <PageHeader
        title="Our Services"
        subtitle="Professional furniture moving and packing services tailored to your needs"
        backgroundImage="/images/IMG-20250910-WA0018.jpg"
        breadcrumbs={[
          { label: 'Services', href: null }
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Loading State with Skeletons */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ServiceCardSkeleton key={item} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Services</h3>
                <p className="text-red-600 mb-4">Please check your connection and try again.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Services Grid - Only show when data is loaded */}
      {!loading && !error && (
  <>
    {displayServices.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {displayServices.map((service, index) => (
          <Link 
            href={services && services[index]?.slug ? `/services/${services[index].slug}` : '#'}
            key={services && services[index]?.id || index} 
            className="h-[50vh] bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block overflow-hidden flex flex-col"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mb-3 flex-shrink-0">
              <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            
            <h3 className="text-sm md:text-base font-bold mb-2 text-gray-900 line-clamp-2">
              {service.title}
            </h3>
            
            <p className="text-gray-600 mb-3 text-xs line-clamp-3 flex-shrink-0">
              {service.description}
            </p>
            
            <div className="space-y-1 md:space-y-2 flex-1 overflow-hidden">
              <h4 className="font-semibold text-xs md:text-sm text-gray-700">Key Features:</h4>
              <ul className="space-y-1 overflow-hidden">
                {service.features.slice(0, 3).map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-xs md:text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mr-1.5 md:mr-2 mt-1 flex-shrink-0"></span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-xs text-blue-600 font-medium">
                    +{service.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>

            {/* Show price if available from API */}
            {services && services[index]?.price && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex-shrink-0">
                <p className="text-sm font-semibold text-blue-600">
                  Starting from AED {services[index].price}
                </p>
              </div>
            )}
          </Link>
        ))}
      </div>
    ) : (
      /* Empty State */
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Services Available</h3>
          <p className="text-gray-600">Check back later for our service offerings.</p>
        </div>
      </div>
    )}
  </>
)}
          
          {/* Call to Action Section - Always show */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Ready to Move?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get a free quote today and experience stress-free furniture moving with Marhaba
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button className="border-2 border-orange-500 text-orange-600 px-6 md:px-8 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold">
                Call: +971568011076
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}