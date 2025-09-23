'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const HeroSliderContext = createContext({})

export const useHeroSlider = () => {
  const context = useContext(HeroSliderContext)
  if (!context) {
    throw new Error('useHeroSlider must be used within a HeroSliderProvider')
  }
  return context
}

export const HeroSliderProvider = ({ children }) => {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHeroSlides = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/hero-slider?active=true')
      const data = await response.json()

      if (data.success) {
        // If we have slides from API, use them
        if (data.data && data.data.length > 0) {
          setSlides(data.data)
        } else {
          // Use default slides if no data from API
          setSlides(getDefaultSlides())
        }
      } else {
        throw new Error(data.message || 'Failed to fetch hero slides')
      }
    } catch (err) {
      console.error('Error fetching hero slides:', err)
      setError(err.message)
      // Use default slides on error
      setSlides(getDefaultSlides())
    } finally {
      setLoading(false)
    }
  }

  const updateHeroSlide = async (id, slideData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/hero-slider/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slideData),
      })

      const data = await response.json()

      if (data.success) {
        await fetchHeroSlides() // Refresh slides
        return { success: true, data: data.data }
      } else {
        throw new Error(data.message || 'Failed to update hero slide')
      }
    } catch (err) {
      console.error('Error updating hero slide:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const createHeroSlide = async (slideData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/hero-slider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slideData),
      })

      const data = await response.json()

      if (data.success) {
        await fetchHeroSlides() // Refresh slides
        return { success: true, data: data.data }
      } else {
        throw new Error(data.message || 'Failed to create hero slide')
      }
    } catch (err) {
      console.error('Error creating hero slide:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteHeroSlide = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/hero-slider/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        await fetchHeroSlides() // Refresh slides
        return { success: true }
      } else {
        throw new Error(data.message || 'Failed to delete hero slide')
      }
    } catch (err) {
      console.error('Error deleting hero slide:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHeroSlides()
  }, [])

  const value = {
    slides,
    loading,
    error,
    fetchHeroSlides,
    updateHeroSlide,
    createHeroSlide,
    deleteHeroSlide,
  }

  return (
    <HeroSliderContext.Provider value={value}>
      {children}
    </HeroSliderContext.Provider>
  )
}

// Default slides to use as fallback
const getDefaultSlides = () => [
  {
    id: 1,
    title: "Professional Moving Services",
    subtitle: "Your Trusted Moving Partner",
    description: "Experience seamless relocation with our expert team. We handle your belongings with utmost care and ensure safe delivery to your new destination.",
    imageUrl: "/carousel/1.jpg",
    buttonText: "Get Free Quote",
    buttonUrl: "/contact",
    icon: "Truck",
    order: 1,
    isActive: true
  },
  {
    id: 2,
    title: "Secure Packing Solutions",
    subtitle: "Premium Packing Materials",
    description: "Our specialized packing services use high-quality materials to protect your valuables during transit. Every item is carefully wrapped and secured.",
    imageUrl: "/carousel/2.jpg",
    buttonText: "Get Free Quote",
    buttonUrl: "/contact",
    icon: "Package",
    order: 2,
    isActive: true
  },
  {
    id: 3,
    title: "Insured & Licensed",
    subtitle: "Complete Peace of Mind",
    description: "All our services are fully insured and licensed. Your belongings are protected throughout the entire moving process with comprehensive coverage.",
    imageUrl: "/carousel/3.jpg",
    buttonText: "Get Free Quote",
    buttonUrl: "/contact",
    icon: "Shield",
    order: 3,
    isActive: true
  },
  {
    id: 4,
    title: "24/7 Support Service",
    subtitle: "Always Here When You Need Us",
    description: "Our dedicated customer support team is available round the clock to assist you with any queries or concerns during your moving journey.",
    imageUrl: "/carousel/4.jpg",
    buttonText: "Get Free Quote",
    buttonUrl: "/contact",
    icon: "Clock",
    order: 4,
    isActive: true
  },
  {
    id: 5,
    title: "Expert Team",
    subtitle: "Experienced Professionals",
    description: "Our skilled and experienced team ensures your move is handled with expertise and care. We bring years of experience to make your relocation smooth.",
    imageUrl: "/carousel/5.jpg",
    buttonText: "Get Free Quote",
    buttonUrl: "/contact",
    icon: "Users",
    order: 5,
    isActive: true
  }
]

export default HeroSliderContext