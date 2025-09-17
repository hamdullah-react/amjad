import Image from 'next/image'
import { CheckCircle2, Clock, Truck, Users } from 'lucide-react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ahmed Al-Farsi",
      position: "Founder & CEO",
      image: "/images/slide1.jpg",
      bio: "With over 15 years in the furniture industry, Ahmed founded Marhaba Furniture with a vision to provide quality furniture moving services."
    },
    {
      name: "Fatima Rahman",
      position: "Operations Manager",
      image: "/images/slide2.svg",
      bio: "Fatima ensures all furniture moving operations run smoothly, from scheduling to delivery, with attention to every detail."
    },
    {
      name: "Mohammed Khalid",
      position: "Customer Relations",
      image: "/images/slide3.svg",
      bio: "Mohammed is dedicated to providing exceptional customer service and ensuring client satisfaction with every move."
    },
    {
      name: "Sara Al-Mansouri",
      position: "Logistics Specialist",
      image: "/images/slide4.svg",
      bio: "Sara's expertise in logistics ensures your furniture is transported efficiently and safely to its destination."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Marhaba Furniture</span>
        </h1>
        <div className="inline-flex items-center justify-center w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-6"></div>
        <p className="text-[8px] sm:text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for all furniture moving needs in Dubai and across the UAE since 2010.
        </p>
      </div>
      
      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image 
            src="/images/slide1.jpg" 
            alt="Marhaba Furniture History" 
            fill 
            style={{objectFit: "cover"}}
            className="rounded-2xl"
          />
        </div>
        
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Our Story
          </h2>
          <p className="text-[8px] sm:text-sm text-gray-600 mb-4">
            Founded in 2010, Marhaba Furniture began with a simple mission: to provide reliable, efficient, and careful furniture moving services to the residents of Dubai. What started as a small family business has grown into one of the most trusted furniture moving companies in the UAE.
          </p>
          <p className="text-[8px] sm:text-sm text-gray-600 mb-4">
            Over the years, we've expanded our services to include furniture assembly, storage solutions, and international shipping, all while maintaining our commitment to exceptional customer service and care for your valuable possessions.
          </p>
          <p className="text-[8px] sm:text-sm text-gray-600">
            Today, we're proud to have helped thousands of families and businesses safely transport their furniture across the UAE and beyond, building a reputation for reliability, professionalism, and excellence.
          </p>
        </div>
      </div>
      
      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-[8px] sm:text-sm text-gray-600 mb-4">
            To provide exceptional furniture moving services that exceed customer expectations through reliability, care, and attention to detail.
          </p>
          <ul className="space-y-3">
            {["Safe and secure transportation", "Timely delivery", "Professional handling", "Transparent pricing"].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-[8px] sm:text-sm text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-[8px] sm:text-sm text-gray-600 mb-4">
            To be the leading furniture moving company in the UAE, known for our exceptional service, reliability, and customer satisfaction.
          </p>
          <ul className="space-y-3">
            {["Industry leadership", "Customer-first approach", "Continuous improvement", "Community engagement"].map((item, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-[8px] sm:text-sm text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Marhaba Furniture</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Truck className="w-8 h-8 text-blue-600" />,
              title: "Experienced Team",
              description: "Our professional movers have years of experience handling all types of furniture."
            },
            {
              icon: <Clock className="w-8 h-8 text-blue-600" />,
              title: "Timely Service",
              description: "We value your time and ensure prompt pickup and delivery of your furniture."
            },
            {
              icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />,
              title: "Careful Handling",
              description: "Your furniture is treated with the utmost care throughout the moving process."
            },
            {
              icon: <Users className="w-8 h-8 text-blue-600" />,
              title: "Customer Satisfaction",
              description: "Our high customer satisfaction rate speaks to our commitment to excellence."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-[8px] sm:text-sm md:text-lg font-bold mb-2 text-gray-800 text-center">{feature.title}</h3>
              <p className="text-[8px] sm:text-sm text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Team Section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-4">
                <h3 className="text-[8px] sm:text-sm md:text-lg font-bold mb-1 text-gray-800">{member.name}</h3>
                <p className="text-[8px] sm:text-xs text-blue-600 font-medium mb-2">{member.position}</p>
                <p className="text-[8px] sm:text-sm text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}