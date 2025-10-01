"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const FAQContext = createContext();

export const useFAQ = () => {
  const context = useContext(FAQContext);
  if (!context) {
    throw new Error('useFAQ must be used within a FAQProvider');
  }
  return context;
};

export const FAQProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/faq');
      const result = await response.json();

      if (result.success) {
        // Filter only active FAQs and sort by order
        const activeFAQs = result.data
          .filter(faq => faq.isActive)
          .sort((a, b) => a.order - b.order);
        setFaqs(activeFAQs);
      } else {
        setError('Failed to fetch FAQs');
      }
    } catch (err) {
      setError('Error loading FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <FAQContext.Provider value={{ faqs, loading, error, refetch: fetchFAQs }}>
      {children}
    </FAQContext.Provider>
  );
};