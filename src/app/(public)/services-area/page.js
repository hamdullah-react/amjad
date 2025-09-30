'use client'

import { useState, useEffect } from 'react'
import PageHeader from '@/myComponents/PageHeader/PageHeader'
import { MapPin, Clock, Phone, Truck, AlertCircle, RefreshCw } from 'lucide-react'
import { useDataFetching } from '@/contexts/service-areas-context'
import Link from 'next/link'

// Skeleton Loader Component
const ServiceAreaSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-lg animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-7 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 rounded-full w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats Skeleton
const StatsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center">
          <div className="text-3xl font-bold bg-gray-300 rounded h-8 w-12 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-16 mx-auto animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}

export default function ServicesAreaPage() {
  const { 
    serviceAreas, 
    loading, 
    error, 
    stats,
    getServiceAreasByEmirate,
    refreshServiceAreas 
  } = useDataFetching()

  const [displayAreas, setDisplayAreas] = useState([])
  const [individualAreas, setIndividualAreas] = useState([])

  // Transform API data to match component structure
  useEffect(() => {
    if (serviceAreas.length > 0) {
      const groupedAreas = getServiceAreasByEmirate()
      const transformedAreas = Object.entries(groupedAreas).map(([emirate, areas]) => {
        // Get icon based on emirate
        let IconComponent = MapPin
        if (emirate === 'Abu Dhabi') IconComponent = Truck
        if (emirate === 'Sharjah') IconComponent = Clock
        if (['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].includes(emirate)) 
          IconComponent = Phone

        // Get all coverage areas
        const allAreas = areas.flatMap(area => [
          area.area,
          ...(area.coverage || [])
        ]).filter(Boolean).slice(0, 8) // Limit to 8 areas for display

        // Check if any area offers same-day delivery
        const hasSameDayDelivery = areas.some(area => 
          area.deliveryTime?.toLowerCase().includes('same day') || 
          area.deliveryTime?.toLowerCase().includes('same-day')
        )

        return {
          region: emirate,
          areas: allAreas,
          description: areas[0]?.description || `Professional furniture moving services in ${emirate}`,
          icon: IconComponent,
          deliveryTime: areas[0]?.deliveryTime,
          extraCharges: areas[0]?.extraCharges,
          hasSameDayDelivery,
          totalAreas: allAreas.length,
          // Store the individual service areas for this emirate
          individualServiceAreas: areas
        }
      })
      setDisplayAreas(transformedAreas)
      
      // Also set individual areas for direct linking
      setIndividualAreas(serviceAreas)
    }
  }, [serviceAreas, getServiceAreasByEmirate])

  // Calculate statistics from API data
  const calculatedStats = {
    emirates: stats.emirates || displayAreas.length,
    totalAreas: serviceAreas.reduce((total, area) => {
      return total + (area.coverage?.length || 0) + (area.area ? 1 : 0)
    }, 0),
    sameDayAreas: displayAreas.filter(area => area.hasSameDayDelivery).length,
    activeAreas: stats.active || serviceAreas.filter(area => area.isActive).length
  }

  return (
    <div>
      {/* Page Header Banner */}
      <PageHeader
        title="Service Areas"
        subtitle="Professional furniture moving services across all UAE Emirates"
        backgroundImage="/images/IMG-20250910-WA0019.jpg"
        breadcrumbs={[
          { label: 'Service Areas', href: null }
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-3">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold text-red-800">Error Loading Service Areas</h3>
              </div>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={refreshServiceAreas}
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}

          {/* Service Areas Grid - Show individual service areas instead of grouped */}
          <div className="grid lg:grid-cols-2 gap-8">
            {loading ? (
              // Show skeleton loaders
              [...Array(4)].map((_, index) => (
                <ServiceAreaSkeleton key={index} />
              ))
            ) : individualAreas.length > 0 ? (
              // Show actual individual service areas from API
              individualAreas.map((area) => (
                <Link 
                  href={`/services-area/${area.slug}`} 
                  key={area.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {/* Get icon based on emirate */}
                      {area.emirate === 'Abu Dhabi' && <Truck className="w-6 h-6 text-white" />}
                      {area.emirate === 'Sharjah' && <Clock className="w-6 h-6 text-white" />}
                      {['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].includes(area.emirate) && <Phone className="w-6 h-6 text-white" />}
                      {(area.emirate === 'Dubai' || !['Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].includes(area.emirate)) && <MapPin className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        {area.city}
                        {area.area && <span className="text-orange-600"> - {area.area}</span>}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {area.description || `Professional furniture moving services in ${area.emirate}`}
                      </p>

                      <div>
                        <h4 className="font-semibold mb-2 text-gray-700">
                          Coverage Areas ({area.coverage ? area.coverage.length : 0}):
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {area.coverage && area.coverage.length > 0 ? (
                            area.coverage.map((location, locationIndex) => (
                              <span
                                key={locationIndex}
                                className="bg-gradient-to-r from-blue-50 to-orange-50 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200"
                              >
                                {location}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 text-sm">No specific coverage areas defined</span>
                          )}
                        </div>
                      </div>

                      {/* Additional Info from API */}
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        {area.deliveryTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {area.deliveryTime}
                          </span>
                        )}
                        {area.extraCharges && (
                          <span className="flex items-center gap-1">
                            Extra: AED {area.extraCharges}
                          </span>
                        )}
                        {(area.deliveryTime?.toLowerCase().includes('same day') || area.deliveryTime?.toLowerCase().includes('same-day')) && (
                          <span className="flex items-center gap-1 text-green-600 font-semibold">
                            Same Day Available
                          </span>
                        )}
                      </div>

                      {/* Location and Status */}
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {area.emirate}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          area.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {area.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // No data state
              !loading && (
                <div className="col-span-2 text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Service Areas Available</h3>
                  <p className="text-gray-600 mb-6">Service areas will be added soon.</p>
                </div>
              )
            )}
          </div>
        
          {/* Statistics Section - Dynamic from API */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Our Service Coverage</h2>
            <p className="text-gray-600 text-center mb-6">
              Comprehensive furniture moving services across the United Arab Emirates with local expertise in every emirate.
            </p>

            {loading ? (
              <StatsSkeleton />
            ) : (
              <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {calculatedStats.emirates}
                  </div>
                  <div className="text-sm text-gray-600">Emirates Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {calculatedStats.totalAreas}
                  </div>
                  <div className="text-sm text-gray-600">Areas Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {calculatedStats.activeAreas}
                  </div>
                  <div className="text-sm text-gray-600">Active Locations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">
                    {calculatedStats.sameDayAreas}
                  </div>
                  <div className="text-sm text-gray-600">Same Day Service</div>
                </div>
              </div>
            )}
          </div>
        
          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Need Service in Your Area?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us to check availability in your location or schedule a custom moving service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                Check Availability
              </button>
              <a 
                href="tel:+971568011076"
                className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold text-center"
              >
                Call: +971568011076
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}