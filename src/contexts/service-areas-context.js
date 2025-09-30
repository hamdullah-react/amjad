'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ServiceAreasContext = createContext(undefined)

export function ServiceAreasProvider({ children }) {
  const [serviceAreas, setServiceAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    emirates: 0,
    areas: 0
  })

  // Fetch service areas from API
  const fetchServiceAreas = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/service-areas')
      const result = await response.json()

      if (result.success) {
        setServiceAreas(result.data)
        setStats(result.stats)
      } else {
        setError(result.message || 'Failed to fetch service areas')
      }
    } catch (err) {
      setError('Network error: Failed to fetch service areas')
      console.error('Error fetching service areas:', err)
    } finally {
      setLoading(false)
    }
  }

  // Group service areas by emirate
  const getServiceAreasByEmirate = () => {
    const grouped = {}
    
    serviceAreas.forEach(area => {
      if (!grouped[area.emirate]) {
        grouped[area.emirate] = []
      }
      grouped[area.emirate].push(area)
    })

    return grouped
  }

  // Get active service areas only
  const getActiveServiceAreas = () => {
    return serviceAreas.filter(area => area.isActive)
  }

  // Refresh service areas
  const refreshServiceAreas = () => {
    fetchServiceAreas()
  }

  // Load service areas on mount
  useEffect(() => {
    fetchServiceAreas()
  }, [])

  const value = {
    // State
    serviceAreas,
    loading,
    error,
    stats,
    
    // Methods
    fetchServiceAreas,
    getServiceAreasByEmirate,
    getActiveServiceAreas,
    refreshServiceAreas
  }

  return (
    <ServiceAreasContext.Provider value={value}>
      {children}
    </ServiceAreasContext.Provider>
  )
}

export const useDataFetching = () => {
  const context = useContext(ServiceAreasContext)
  
  if (context === undefined) {
    throw new Error('useDataFetching must be used within a DataFetchingProvider')
  }
  
  return context
}