"use client"

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@marhabamovers.ae",
      description: "Send us an email anytime",
      link: "mailto:info@marhabamovers.ae"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+971568011076",
      description: "Mon-Fri from 8am to 5pm",
      link: "tel:+971568011076"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Dubai, United Arab Emirates",
      description: "Visit us at our location"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      description: "8:00 AM - 5:00 PM GST"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Us</span>
          </h1>
          <div className="inline-flex items-center justify-center w-16 h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full mb-6"></div>
          <p className="text-[8px] sm:text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
             Get in touch with us. We'd love to hear from you and help with your furniture moving needs.
           </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-600" />
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-[8px] sm:text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="text-[8px] sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[8px] sm:text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="text-[8px] sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-[8px] sm:text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this regarding?"
                  className="text-[8px] sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-[8px] sm:text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[8px] sm:text-sm"
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-sm">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Contact Information
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 hover:border-blue-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <h3 className="text-[8px] sm:text-sm md:text-lg font-bold mb-2 text-gray-800">{item.title}</h3>
                    <p className="text-[8px] sm:text-sm font-medium mb-1 text-gray-700">{item.details}</p>
                    <p className="text-[8px] sm:text-xs text-gray-500">{item.description}</p>
                    {item.link && (
                      <a 
                        href={item.link} 
                        className="inline-block mt-3 text-[8px] sm:text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Contact Now
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Map */}
            <div className="mt-6 sm:mt-8 rounded-xl overflow-hidden shadow-md border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.947287526927106!3d25.076280448850334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What are your response times?</h3>
              <p className="text-muted-foreground text-sm">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Do you offer emergency support?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, we provide 24/7 emergency support for critical issues with our premium plans.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I schedule a consultation?</h3>
              <p className="text-muted-foreground text-sm">
                Absolutely! Contact us to schedule a free consultation to discuss your needs.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What information should I include?</h3>
              <p className="text-muted-foreground text-sm">
                Please include as much detail as possible about your project or inquiry for faster assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}