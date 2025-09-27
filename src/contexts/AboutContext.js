"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const AboutContext = createContext()

export function AboutProvider({ children }) {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAboutData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/about')
      
      if (!res.ok) {
        throw new Error('Failed to fetch about data')
      }
      
      const result = await res.json()
      
      if (result.length > 0) {
        setAboutData(result[0].data)
      } else {
        setAboutData(null)
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching about data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAboutData()
  }, [])

  const value = {
    aboutData,
    loading,
    error,
    refetch: fetchAboutData
  }

  return (
    <AboutContext.Provider value={value}>
      {children}
    </AboutContext.Provider>
  )
}

export function useAbout() {
  const context = useContext(AboutContext)
  if (context === undefined) {
    throw new Error('useAbout must be used within an AboutProvider')
  }
  return context
}