import { notFound } from 'next/navigation';
import PageHeader from '@/myComponents/PageHeader/PageHeader';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  Calendar,
  Navigation,
  Truck,
  Star
} from 'lucide-react';

// Fetch service area by slug
async function getServiceAreaBySlug(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/service-areas/slug/${slug}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching service area:', error);
    return null;
  }
}

// Generate static params
export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/service-areas`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    
    if (result.success) {
      return result.data
        .filter(area => area.isActive)
        .map((area) => ({
          slug: area.slug,
        }));
    }
    
    return [];
  } catch (error) {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }) {
  const area = await getServiceAreaBySlug(params.slug);
  
  if (!area) {
    return {
      title: 'Service Area Not Found',
    };
  }

  const title = `${area.city}${area.area ? ` - ${area.area}` : ''}, ${area.emirate} | Marhaba Moving Services`;
  const description = area.description || `Professional furniture moving services in ${area.city}${area.area ? `, ${area.area}` : ''}, ${area.emirate}.`;

  return {
    title,
    description: description.substring(0, 160),
    openGraph: {
      title,
      description: description.substring(0, 160),
      type: 'website',
    },
  };
}

export default async function ServiceAreaDetailPage({ params }) {
  const area = await getServiceAreaBySlug(params.slug);

  if (!area) {
    notFound();
  }

  const formatCharges = (charges) => {
    if (!charges) return 'No extra charges';
    return `AED ${charges}`;
  };

  const formatDeliveryTime = (time) => {
    if (!time) return 'Standard Delivery';
    return time;
  };

  const isSameDayDelivery = (time) => {
    return time?.toLowerCase().includes('same day') || time?.toLowerCase().includes('same-day');
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title={`${area.city}${area.area ? ` - ${area.area}` : ''}`}
        subtitle={`Professional furniture moving services in ${area.emirate}`}
        backgroundImage="/images/IMG-20250910-WA0019.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Service Areas', href: '/service-areas' },
          { label: `${area.city}${area.area ? ` - ${area.area}` : ''}`, href: null }
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Location Header */}
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {area.city}
                      {area.area && (
                        <span className="text-orange-600"> - {area.area}</span>
                      )}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-5 h-5" />
                        {area.emirate}
                      </span>
                      {area.isPrimary && (
                        <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          <Star className="w-4 h-4" />
                          Primary Area
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Area Description */}
              {area.description && (
                <div className="prose prose-lg max-w-none mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Service Overview
                  </h2>
                  <div className="text-gray-700 leading-relaxed text-justify">
                    {area.description}
                  </div>
                </div>
              )}

              {/* Coverage Areas */}
              {area.coverage && area.coverage.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Navigation className="w-6 h-6 text-blue-500 mr-3" />
                    Coverage Areas
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We provide comprehensive furniture moving services in the following neighborhoods and areas:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {area.coverage.map((location, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{location}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Details */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Service Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Delivery Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 text-blue-500 mr-2" />
                      Delivery Information
                    </h3>
                    <div className={`p-4 rounded-lg ${
                      isSameDayDelivery(area.deliveryTime) 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <p className="font-medium text-gray-900 text-lg">
                        {formatDeliveryTime(area.deliveryTime)}
                      </p>
                      {isSameDayDelivery(area.deliveryTime) && (
                        <p className="text-green-600 text-sm mt-2 font-medium">
                          ✓ Same day service available
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                      Pricing Information
                    </h3>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <p className="font-medium text-gray-900 text-lg">
                        {formatCharges(area.extraCharges)}
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        {area.extraCharges ? 'Additional charges may apply' : 'Standard pricing applies'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Truck className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Professional Moving</p>
                      <p className="text-sm text-gray-600">Trained teams & equipment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-orange-600" />
                    <div>
                      <p className="font-medium text-gray-900">Flexible Scheduling</p>
                      <p className="text-sm text-gray-600">Available 7 days a week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
                
                {/* Service Status */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                    Area Status
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Availability</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        area.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {area.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Service Priority</span>
                      <span className="text-gray-900 font-medium">{area.order || 'Standard'}</span>
                    </div>
                  </div>
                </div>

                {/* Postal Codes */}
                {area.postalCodes && area.postalCodes.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Postal Codes</h3>
                    <div className="flex flex-wrap gap-2">
                      {area.postalCodes.map((code, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Get Moving Today</h3>
                  
                  <div className="space-y-3">
                    <a
                      href="/contact"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Free Quote
                    </a>
                    
                    <a
                      href="tel:+971568011076"
                      className="w-full border-2 border-orange-500 text-orange-600 py-3 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </a>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Call us: <strong className="text-orange-600">+971 56 801 1076</strong>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Areas CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Explore Other Areas
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We provide comprehensive furniture moving services across all UAE Emirates with local expertise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/service-areas"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                View All Areas
              </a>
              <a 
                href="/contact"
                className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}