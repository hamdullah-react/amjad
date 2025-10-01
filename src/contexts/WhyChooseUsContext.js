'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const WhyChooseUsContext = createContext()

export const useWhyChooseUs = () => {
  const context = useContext(WhyChooseUsContext)
  if (!context) {
    throw new Error('useWhyChooseUs must be used within a WhyChooseUsProvider')
  }
  return context
}

export const WhyChooseUsProvider = ({ children }) => {
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch reasons from API
  const fetchReasons = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/why-choose-us')
      const result = await response.json()

      if (result.success) {
        setReasons(result.data)
      } else {
        setError(result.message || 'Failed to fetch reasons')
      }
    } catch (err) {
      setError('Error fetching reasons: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Load reasons on component mount
  useEffect(() => {
    fetchReasons()
  }, [])

  // Get active reasons only
  const activeReasons = reasons.filter(reason => reason.isActive)

  const value = {
    reasons: activeReasons,
    allReasons: reasons,
    loading,
    error,
    refetch: fetchReasons
  }

  return (
    <WhyChooseUsContext.Provider value={value}>
      {children}
    </WhyChooseUsContext.Provider>
  )
}