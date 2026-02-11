import { notFound } from 'next/navigation';
import PageHeader from '@/myComponents/PageHeader/PageHeader';
import { Calendar, Clock, DollarSign, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import CTASection from '@/myComponents/CTASection/CTASection';
import prisma from '@/lib/prisma';

// Generate static params
// Revalidate every hour (3600 seconds) - or choose your timeframe
export const revalidate = 30;

export async function generateStaticParams() {
  try {
    const services = await prisma.service.findMany();
    
    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const service = await prisma.service.findUnique({
      where: { slug },
    });
    
    if (!service) {
      return {
        title: 'Service Not Found',
      };
    }

    return {
      title: `${service.title} - Marhaba Moving Services`,
      description: service.shortDesc || service.description?.substring(0, 160),
      openGraph: {
        title: service.title,
        description: service.shortDesc || service.description?.substring(0, 160),
        images: service.imageUrl ? [service.imageUrl] : [],
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Service',
    };
  }
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  // Use Prisma directly instead of fetch
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) {
    notFound();
  }

  // console.log("object", service);

  const formatPrice = (price) => {
    if (!price) return 'Contact for pricing';
    return `AED ${price}`;
  };

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title={service.title}
        subtitle={service.shortDesc || "Professional moving service"}
        backgroundImage="/images/IMG-20250910-WA0018.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title, href: null }
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Service Image */}
              {service.imageUrl && (
                <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              )}

              {/* Service Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  About This Service
                </h2>
                <div 
                  className="text-gray-700 leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ 
                    __html: service.description || '<p>Professional service with quality guarantee.</p>' 
                  }}
                />
              </div>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 md:p-8 mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    Service Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
                
                {/* Pricing */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                    Pricing
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPrice(service.price)}
                  </p>
                  {service.price && (
                    <p className="text-sm text-gray-600 mt-1">Starting price</p>
                  )}
                </div>

                {/* Service Info */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Service Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 text-blue-500 mr-3" />
                      <span className="text-sm">Available 24/7</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 text-blue-500 mr-3" />
                      <span className="text-sm">Same-day service available</span>
                    </div>
                    
                    {service.order && (
                      <div className="flex items-center text-gray-700">
                        <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
                        <span className="text-sm">Priority service</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Call to Action */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Get Started</h3>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Free Quote
                    </button>
                    
                    <button className="w-full border-2 border-orange-500 text-orange-600 py-3 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Call us: <strong className="text-orange-600">+971 56 801 1076</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Services CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl">
            <CTASection variant="services-dynamic" />
          </div>
        </div>
      </section>
    </div>
  );
}