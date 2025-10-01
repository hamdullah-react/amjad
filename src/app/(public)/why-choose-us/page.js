import WhyChooseUs from '@/myComponents/WhyChooseUs/WhyChooseUs'
import PageHeader from '@/myComponents/PageHeader/PageHeader'
import React from 'react'

const page = () => {
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

export default page