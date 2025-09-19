import PageHeader from '@/myComponents/PageHeader/PageHeader'
import { Truck, Package, Home, Users, Shield, Clock } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      title: "Local Moving",
      description: "Professional furniture moving services within Dubai and across the UAE.",
      features: ["Same-day service", "Professional packing", "Careful handling", "Insurance coverage"]
    },
    {
      icon: Package,
      title: "Packing & Unpacking",
      description: "Expert packing services to ensure your furniture is protected during transit.",
      features: ["Quality materials", "Custom crating", "Fragile item care", "Systematic labeling"]
    },
    {
      icon: Home,
      title: "Furniture Assembly",
      description: "Professional assembly and disassembly of all types of furniture.",
      features: ["Expert technicians", "All furniture types", "Tool equipped", "Clean service"]
    },
    {
      icon: Users,
      title: "Office Relocation",
      description: "Comprehensive office moving services with minimal business disruption.",
      features: ["Weekend service", "IT equipment care", "Furniture setup", "Flexible scheduling"]
    },
    {
      icon: Shield,
      title: "Storage Solutions",
      description: "Secure, climate-controlled storage facilities for your furniture.",
      features: ["24/7 security", "Climate control", "Flexible terms", "Easy access"]
    },
    {
      icon: Clock,
      title: "Emergency Moving",
      description: "Last-minute moving services available 24/7 for urgent relocations.",
      features: ["24/7 availability", "Quick response", "Express service", "Emergency team"]
    }
  ]

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
        
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mb-3">
                <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-bold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-3 text-xs">{service.description}</p>
              
              <div className="space-y-1 md:space-y-2">
                <h4 className="font-semibold text-xs md:text-sm text-gray-700">Key Features:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs md:text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mr-1.5 md:mr-2 mt-1 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Move?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get a free quote today and experience stress-free furniture moving with Marhaba
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                Get Free Quote
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