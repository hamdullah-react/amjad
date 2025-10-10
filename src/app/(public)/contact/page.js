"use client"

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PageHeader from '@/myComponents/PageHeader/PageHeader'
import ContactSkeleton from '@/components/contact/ContactSkeleton'
import { useContact } from '@/contexts/contact-context'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import FAQSection from '@/myComponents/FAQSection/FAQSection'
import { motion } from 'framer-motion'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleUp } from '@/lib/animations'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { contactInfo, loading: isLoadingContact } = useContact()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Default FAQs (you can move this to API later)
  const faqs = [
    {
      question: "How quickly can I get a quote?",
      answer: "We provide instant quotes through our online form and typically respond to detailed inquiries within 2-4 hours during business hours."
    },
    {
      question: "Do you offer same-day moving services?",
      answer: "Yes, we offer same-day and emergency moving services for urgent relocations, subject to availability."
    },
    {
      question: "Are your services available on weekends?",
      answer: "Absolutely! We operate Monday through Saturday to accommodate your schedule."
    },
    {
      question: "How can I track my inquiry?",
      answer: "Once you submit your inquiry, you'll receive a confirmation email with a reference number to track your request."
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setTimeout(() => setShowSuccess(false), 5000)
      } else {
        const error = await response.json()
        console.error('Error sending email:', error)
        setErrorMessage('Failed to send message. Please try again or contact us directly.')
        setShowError(true)
        setTimeout(() => setShowError(false), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Failed to send message. Please check your connection and try again.')
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Prepare contact cards data from API response
  const getContactCards = () => {
    if (!contactInfo) {
      // Return default values if no data from API
      return [
        {
          icon: Mail,
          title: "Email Us",
          details: "info@marhabamovers.ae",
          description: "24/7 Support Available",
          link: "mailto:info@marhabamovers.ae",
          color: "blue"
        },
        {
          icon: Phone,
          title: "Call Us",
          details: "+971 568 011 076",
          description: "Mon-Sat 8:00 AM - 7:00 PM",
          link: "tel:+971568011076",
          color: "orange"
        },
        {
          icon: MapPin,
          title: "Visit Us",
          details: "Dubai, UAE",
          description: "Main Office Location",
          color: "blue"
        },
        {
          icon: Clock,
          title: "Working Hours",
          details: "Monday - Saturday",
          description: "8:00 AM - 7:00 PM GST",
          color: "orange"
        }
      ]
    }

    // Use data from API
    const cards = []

    if (contactInfo.email) {
      cards.push({
        icon: Mail,
        title: "Email Us",
        details: contactInfo.email,
        description: "24/7 Support Available",
        link: `mailto:${contactInfo.email}`,
        color: "blue"
      })
    }

    if (contactInfo.phone) {
      cards.push({
        icon: Phone,
        title: "Call Us",
        details: contactInfo.phone,
        description: contactInfo.workingHours?.monday || "Mon-Sat 8:00 AM - 7:00 PM",
        link: `tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`,
        color: "orange"
      })
    }

    if (contactInfo.address || contactInfo.city || contactInfo.emirate) {
      const locationParts = [contactInfo.address, contactInfo.city, contactInfo.emirate].filter(Boolean)
      cards.push({
        icon: MapPin,
        title: "Visit Us",
        details: locationParts.join(', ') || "Dubai, UAE",
        description: "Main Office Location",
        color: "blue",
        link: contactInfo.googleMapsUrl
      })
    }

    if (contactInfo.workingHours) {
      const workingDays = Object.entries(contactInfo.workingHours)
        .filter(([day, hours]) => hours && hours !== 'Closed')
        .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))

      const firstDay = workingDays[0] || 'Monday'
      const lastDay = workingDays[workingDays.length - 1] || 'Saturday'

      cards.push({
        icon: Clock,
        title: "Working Hours",
        details: `${firstDay} - ${lastDay}`,
        description: contactInfo.workingHours.monday || "8:00 AM - 7:00 PM GST",
        color: "orange"
      })
    }

    return cards
  }

  // Show skeleton while loading
  if (isLoadingContact) {
    return (
      <>
        <PageHeader
          title="Get In Touch"
          subtitle="We're here to help with all your furniture moving needs. Reach out to us today!"
          backgroundImage="/images/IMG-20250910-WA0018.jpg"
          breadcrumbs={[{ label: 'Contact', href: null }]}
        />
        <ContactSkeleton />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Get In Touch"
        subtitle="We're here to help with all your furniture moving needs. Reach out to us today!"
        backgroundImage="/images/IMG-20250910-WA0018.jpg"
        breadcrumbs={[{ label: 'Contact', href: null }]}
      />

      {/* Hero Section with Gradient */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-white/40"></div>

        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="relative text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={fadeInUp}
            >
              Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Conversation</span>
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              variants={fadeInUp}
            >
              Whether you need a quote, have questions, or ready to book our services, we're just a message away.
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={staggerContainer}
          >
            {getContactCards().map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <motion.div
                    className="group bg-white rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r ${
                    item.color === 'blue'
                      ? 'from-blue-500 to-blue-600'
                      : 'from-orange-500 to-orange-600'
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2 text-gray-800">{item.title}</h3>
                  <p className="font-semibold text-sm md:text-base text-gray-700 mb-1">{item.details}</p>
                  <p className="text-xs md:text-sm text-gray-500 mb-3">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      className={`inline-flex items-center text-sm font-semibold ${
                        item.color === 'blue' ? 'text-blue-600 hover:text-blue-700' : 'text-orange-600 hover:text-orange-700'
                      } transition-colors`}
                    >
                      Contact Now →
                    </a>
                  )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">

          {/* Contact Form - Left Side */}
          <motion.div
            className="lg:col-span-3"
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInLeft}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Send Us a Message</h2>
                  <p className="text-gray-600">Fill out the form and we'll get back to you soon</p>
                </div>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700">Your message has been sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              {/* Error Message */}
              {showError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start animate-fade-in">
                  <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <span className="text-red-700 block">{errorMessage}</span>
                    <span className="text-red-600 text-sm">You can also call us at {contactInfo?.phone || '+971 568 011 076'}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+971 50 123 4567"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="booking">Book a Service</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Map & Additional Info - Right Side */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInRight}
          >
            
            {/* Map Section */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-orange-600">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Us on Map
                </h3>
              </div>
              <div className="h-[400px]">
                <iframe
                  src={contactInfo?.googleMapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.947287526927106!3d25.076280448850334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Our Response Promise</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <p className="text-gray-700">Quote requests: Within 2 hours</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  <p className="text-gray-700">General inquiries: Within 4 hours</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <p className="text-gray-700">Emergency requests: Within 30 minutes</p>
                </div>
              </div>
            </div>
         </motion.div>
        </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <FAQSection/>
          </div>

        </div>
      </section>
    </>
  )
}