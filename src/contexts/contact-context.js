'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ContactContext = createContext({})

export const useContact = () => {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider')
  }
  return context
}

export const ContactProvider = ({ children }) => {
  const [contactInfo, setContactInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchContactInfo = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/contact-info')
      const data = await response.json()

      if (data.success) {
        setContactInfo(data.data)
      } else {
        throw new Error(data.message || 'Failed to fetch contact info')
      }
    } catch (err) {
      console.error('Error fetching contact info:', err)
      setError(err.message)
      setContactInfo(null)
    } finally {
      setLoading(false)
    }
  }

  const updateContactInfo = async (newContactInfo) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/contact-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContactInfo),
      })

      const data = await response.json()

      if (data.success) {
        setContactInfo(data.data)
        return { success: true, data: data.data }
      } else {
        throw new Error(data.message || 'Failed to update contact info')
      }
    } catch (err) {
      console.error('Error updating contact info:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const value = {
    contactInfo,
    loading,
    error,
    fetchContactInfo,
    updateContactInfo,
  }

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  )
}

export default ContactContext