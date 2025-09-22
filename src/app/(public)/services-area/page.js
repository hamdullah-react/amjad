import PageHeader from '@/myComponents/PageHeader/PageHeader'
import { MapPin, Clock, Phone, Truck } from 'lucide-react'

export default function ServicesAreaPage() {
  const serviceAreas = [
    {
      region: "Dubai",
      areas: ["Downtown Dubai", "Dubai Marina", "JBR", "Business Bay", "DIFC", "Palm Jumeirah"],
      description: "Complete furniture moving coverage across all Dubai neighborhoods with same-day service.",
      icon: MapPin
    },
    {
      region: "Abu Dhabi",
      areas: ["Al Reem Island", "Yas Island", "Saadiyat Island", "Al Raha Beach", "Khalifa City"],
      description: "Professional moving services throughout the capital emirate with experienced teams.",
      icon: Truck
    },
    {
      region: "Sharjah",
      areas: ["Al Nahda", "Al Majaz", "Al Taawun", "Al Khan", "University City"],
      description: "Reliable furniture transportation to and from Sharjah with competitive rates.",
      icon: Clock
    },
    {
      region: "Northern Emirates",
      areas: ["Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
      description: "Extended coverage to all Northern Emirates with scheduled moving services.",
      icon: Phone
    }
  ]

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
        
          <div className="grid lg:grid-cols-2 gap-8">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{area.region}</h3>
                    <p className="text-gray-600 mb-4">{area.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2 text-gray-700">Service Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {area.areas.map((location, locationIndex) => (
                          <span
                            key={locationIndex}
                            className="bg-gradient-to-r from-blue-50 to-orange-50 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">UAE-Wide Coverage</h2>
            <p className="text-gray-600 text-center mb-6">
              From Dubai to Fujairah, we provide comprehensive furniture moving services
              throughout the United Arab Emirates with local expertise in every emirate.
            </p>

            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">7</div>
                <div className="text-sm text-gray-600">Emirates Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-sm text-gray-600">Emergency Service</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">100+</div>
                <div className="text-sm text-gray-600">Areas Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-2">Same Day</div>
                <div className="text-sm text-gray-600">Service Available</div>
              </div>
            </div>
          </div>
        
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Need Service in Your Area?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're constantly expanding our coverage. Contact us to check availability in your location or schedule a custom moving service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                Check Availability
              </button>
              <button className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold">
                Call: +971568011076
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}