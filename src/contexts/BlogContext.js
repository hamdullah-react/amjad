import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      const result = await response.json();
      
      if (result.success) {
        setPosts(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    posts,
    loading,
    error,
    refetch: fetchPosts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};