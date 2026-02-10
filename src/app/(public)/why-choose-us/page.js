import WhyChooseUs from '@/myComponents/WhyChooseUs/WhyChooseUs'
import PageHeader from '@/myComponents/PageHeader/PageHeader'
import { buildPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata() {
  return buildPageMetadata('why-choose-us', {
    title: 'Why Choose Us',
    description: 'Discover what makes Marhaba Movers & Packers the preferred choice for thousands of satisfied customers in Dubai and UAE.',
  });
}

export default function WhyChooseUsPage() {
  return (
    <div>
      {/* Page Header Banner */}
      <PageHeader
        title="Why Choose Us"
        subtitle="Discover what makes us the preferred choice for thousands of satisfied customers"
        backgroundImage="/images/IMG-20250910-WA0020.jpg"
        breadcrumbs={[
          { label: 'Why Choose Us', href: null }
        ]}
      />
      <WhyChooseUs />
    </div>
  )
}
