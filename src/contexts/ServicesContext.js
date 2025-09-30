'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

const ServicesContext = createContext();

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/services');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setServices(result.data);
      } else {
        setError(result.message || 'Failed to fetch services');
      }
    } catch (err) {
      setError('Failed to load services');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const value = {
    services,
    loading,
    error,
    refetch: fetchServices
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};