import Image from 'next/image'
import { CheckCircle2, Clock, Truck, Users, Award, Target, Heart, Star, TrendingUp, Shield } from 'lucide-react'
import PageHeader from '@/myComponents/PageHeader/PageHeader'

export default function AboutPage() {
  const stats = [
    { number: "14+", label: "Years Experience", icon: Clock },
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "50K+", label: "Successful Moves", icon: Truck },
    { number: "100%", label: "Satisfaction Rate", icon: Award }
  ]

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our top priority in every move we make."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We handle your furniture with care and ensure secure transportation."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously improving our services with modern solutions."
    }
  ]

  const teamMembers = [
    {
      name: "Ahmed Al-Farsi",
      position: "Founder & CEO",
      image: "/images/IMG-20250910-WA0015.jpg",
      bio: "15+ years of experience leading Marhaba to success.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Fatima Rahman",
      position: "Operations Manager",
      image: "/images/IMG-20250910-WA0016.jpg",
      bio: "Expert in logistics and operational excellence.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Mohammed Khalid",
      position: "Customer Relations",
      image: "/images/IMG-20250910-WA0017.jpg",
      bio: "Dedicated to exceptional customer experiences.",
      social: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Sara Al-Mansouri",
      position: "Logistics Specialist",
      image: "/images/IMG-20250910-WA0019.jpg",
      bio: "Ensuring smooth and efficient furniture transport.",
      social: { linkedin: "#", twitter: "#" }
    }
  ]

  const milestones = [
    { year: "2010", event: "Marhaba Furniture Moving founded in Dubai" },
    { year: "2013", event: "Expanded services across UAE" },
    { year: "2016", event: "Introduced premium packing solutions" },
    { year: "2018", event: "Launched 24/7 emergency moving services" },
    { year: "2020", event: "Digital transformation and online booking" },
    { year: "2024", event: "Leading furniture moving company in UAE" }
  ]

  return (
    <div>
      {/* Page Header Banner */}
      <PageHeader
        title="About Us"
        subtitle="Your trusted partner for all furniture moving needs in Dubai and across the UAE since 2010"
        backgroundImage="/images/IMG-20250910-WA0016.jpg"
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
              const IconComponent = stat.icon;
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
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2010, Marhaba Furniture began with a simple mission: to provide reliable, efficient, and careful furniture moving services to the residents of Dubai.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What started as a small family business has grown into one of the most trusted furniture moving companies in the UAE. Our journey has been marked by continuous growth, innovation, and an unwavering commitment to customer satisfaction.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to have helped thousands of families and businesses safely transport their furniture across the UAE and beyond, building a reputation for reliability, professionalism, and excellence.
              </p>

              {/* Timeline */}
              <div className="mt-8">
                <h3 className="font-bold text-xl mb-6 text-gray-800">Our Journey</h3>
                <div className="space-y-4">
                  {milestones.slice(0, 3).map((milestone, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-20 font-bold text-blue-600">{milestone.year}</div>
                      <div className="flex-1">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mt-1.5 mr-4 float-left"></div>
                        <p className="text-gray-600">{milestone.event}</p>
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
                      src="/images/IMG-20250910-WA0020.jpg"
                      alt="Marhaba Team"
                      fill
                      style={{objectFit: "cover"}}
                      className="hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="relative h-56 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/IMG-20250910-WA0021.jpg"
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
                      src="/images/IMG-20250910-WA0022.jpg"
                      alt="Professional Packing"
                      fill
                      style={{objectFit: "cover"}}
                      className="hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/IMG-20250910-WA0023.jpg"
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
                <span className="font-bold">14+ Years</span>
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
                  To provide exceptional furniture moving services that exceed customer expectations through reliability, care, and attention to detail.
                </p>
                <ul className="space-y-3">
                  {["Safe and secure transportation", "Timely delivery", "Professional handling", "Transparent pricing"].map((item, index) => (
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
                  To be the leading furniture moving company in the UAE, known for our exceptional service, reliability, and customer satisfaction.
                </p>
                <ul className="space-y-3">
                  {["Industry leadership", "Customer-first approach", "Continuous improvement", "Community engagement"].map((item, index) => (
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
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20 bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Marhaba</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine years of experience with modern technology to deliver exceptional moving services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Team",
                description: "Professional movers with years of experience handling all types of furniture.",
                color: "blue"
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                description: "We value your time and ensure prompt pickup and delivery of your furniture.",
                color: "orange"
              },
              {
                icon: Shield,
                title: "Fully Insured",
                description: "Complete insurance coverage for your peace of mind during the move.",
                color: "blue"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-block p-6 bg-white rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${
                      feature.color === 'blue'
                        ? 'from-blue-500 to-blue-600'
                        : 'from-orange-500 to-orange-600'
                    } rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Team</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dedicated professionals committed to making your move seamless
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{objectFit: "cover"}}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-1 text-gray-800">{member.name}</h3>
                    <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600 mb-3">
                      {member.position}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex space-x-3">
                      <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-700 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href={member.social.twitter} className="text-blue-400 hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* CTA Section */}
          <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-orange-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the Marhaba Difference?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their furniture moving needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                Get Free Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold">
                Call: +971 568 011 076
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}