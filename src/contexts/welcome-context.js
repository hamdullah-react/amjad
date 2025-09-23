'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const WelcomeContext = createContext({})

export const useWelcome = () => {
  const context = useContext(WelcomeContext)
  if (!context) {
    throw new Error('useWelcome must be used within a WelcomeProvider')
  }
  return context
}

export const WelcomeProvider = ({ children }) => {
  const [welcomeData, setWelcomeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWelcomeData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/welcome-section')
      const data = await response.json()

      if (data.success && data.data) {
        setWelcomeData(data.data)
      } else {
        // No data from API
        setWelcomeData(null)
      }
    } catch (err) {
      console.error('Error fetching welcome section:', err)
      setError(err.message)
      setWelcomeData(null)
    } finally {
      setLoading(false)
    }
  }

  const updateWelcomeData = async (updateData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/welcome-section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      const data = await response.json()

      if (data.success) {
        setWelcomeData(data.data)
        return { success: true, data: data.data }
      } else {
        throw new Error(data.message || 'Failed to update welcome section')
      }
    } catch (err) {
      console.error('Error updating welcome section:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const createWelcomeData = async (newData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/welcome-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })

      const data = await response.json()

      if (data.success) {
        setWelcomeData(data.data)
        return { success: true, data: data.data }
      } else {
        throw new Error(data.message || 'Failed to create welcome section')
      }
    } catch (err) {
      console.error('Error creating welcome section:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWelcomeData()
  }, [])

  const value = {
    welcomeData,
    loading,
    error,
    fetchWelcomeData,
    updateWelcomeData,
    createWelcomeData,
  }

  return (
    <WelcomeContext.Provider value={value}>
      {children}
    </WelcomeContext.Provider>
  )
}

export default WelcomeContext