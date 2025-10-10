import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Award, Shield, Users, Truck, CheckCircle, Star } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/myComponents/PageHeader/PageHeader';
import CTASection from '@/myComponents/CTASection/CTASection';
import prisma from '@/lib/prisma';

// Fetch specific why choose us item by slug
async function getWhyChooseUsBySlug(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/why-choose-us/slug/${slug}`, {
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
    console.error('Error fetching why choose us item:', error);
    return null;
  }
}

// Generate static params


export async function generateStaticParams() {
  try {
    const items = await prisma.whyChooseUs.findMany();
    
    return items.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getWhyChooseUsBySlug(slug);
  
  if (!item) {
    return {
      title: 'Why Choose Us Item Not Found',
    };
  }

  return {
    title: `${item.title} | Why Choose Us`,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      type: 'website',
    },
  };
}

// Icon mapping
const ICON_MAP = {
  'award': ({ className }) => <Award className={className} />,
  'shield': ({ className }) => <Shield className={className} />,
  'clock': ({ className }) => <Clock className={className} />,
  'users': ({ className }) => <Users className={className} />,
  'truck': ({ className }) => <Truck className={className} />,
  'check-circle': ({ className }) => <CheckCircle className={className} />,
  'star': ({ className }) => <Star className={className} />,
};

// Color mapping
const COLOR_MAP = {
  'primary': 'bg-blue-500',
  'secondary': 'bg-gray-500',
  'accent': 'bg-orange-500',
  'muted': 'bg-gray-300',
};

export default async function WhyChooseUsDetailPage({ params }) {
  const { slug } = await params;
  const item = await getWhyChooseUsBySlug(slug);

  if (!item) {
    notFound();
  }

  const IconComponent = ICON_MAP[item.icon] || ICON_MAP['award'];
  const colorClass = COLOR_MAP[item.color] || 'bg-blue-500';
  const formattedDate = new Date(item.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header Banner */}
      <PageHeader
        title={item.title}
        subtitle={item.description}
        backgroundImage="/images/IMG-20250910-WA0020.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Why Choose Us', href: '/why-choose-us' },
          { label: item.title, href: null }
        ]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className={`${colorClass} p-8 text-white`}>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-6 text-sm opacity-80 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last updated: {formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Order: #{item.order}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {item.title}
                </h1>
                <p className="text-lg opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {/* Additional details can be added here */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What This Means For You</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our commitment to {item.title.toLowerCase()} ensures that you receive the highest quality service and peace of mind throughout your moving experience. We prioritize excellence in every aspect of our service to make your relocation smooth and stress-free.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Professional and reliable service</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Peace of mind throughout the process</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Exceptional customer experience</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Quality guaranteed results</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience This Benefit?</h3>
                <p className="text-gray-700 mb-6">
                  Get started with our services and experience the {item.title} difference for yourself. Our team is ready to provide you with exceptional moving services.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Contact Us Today
                  </Link>
                  <Link
                    href="/why-choose-us"
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    View All Features
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Items Section */}
        <div className="mt-12">
        
         <CTASection variant="why-choose-us-dynamic" />
        </div>
      </main>
    </div>
  );
}