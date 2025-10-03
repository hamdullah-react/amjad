// src/components/search-modal.jsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, MapPin, Loader, Settings, Star, FileText } from 'lucide-react';
import { useDataFetching } from '@/contexts/service-areas-context';
import { useServices } from '@/contexts/ServicesContext';
import { useWhyChooseUs } from '@/contexts/WhyChooseUsContext';
import { useBlog } from '@/contexts/BlogContext';


export function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery }) {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const { serviceAreas } = useDataFetching();
  const { services } = useServices();
  const { reasons } = useWhyChooseUs();
  const { posts } = useBlog();
 

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Perform search across all data sources
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Search in service areas
      const areaResults = serviceAreas?.filter(item =>
        item.area?.toLowerCase().includes(query.toLowerCase()) ||
        item.emirate?.toLowerCase().includes(query.toLowerCase())
      ).map(item => ({
        id: item.id,
        title: item.area,
        url: `/services-area/${item.slug || item.area.toLowerCase().replace(/\s+/g, '-')}`,
        category: 'Service Area',
        type: 'service-area',
        emirate: item.emirate,
        icon: MapPin
      })) || [];

      // Search in services
      const serviceResults = services?.filter(item =>
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.name?.toLowerCase().includes(query.toLowerCase())
      ).map(item => ({
        id: item.id,
        title: item.title || item.name,
        url: `/services/${item.slug || (item.title || item.name).toLowerCase().replace(/\s+/g, '-')}`,
        category: 'Service',
        type: 'service',
        icon: Settings
      })) || [];

      // Search in why choose us reasons
      const reasonResults = reasons?.filter(item =>
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.name?.toLowerCase().includes(query.toLowerCase())
      ).map(item => ({
        id: item.id,
        title: item.title || item.name,
        url: `/why-choose-us/${item.slug || (item.title || item.name).toLowerCase().replace(/\s+/g, '-')}`,
        category: 'Why Choose Us',
        type: 'reason',
        icon: Star
      })) || [];

      // Search in blog posts
      const blogResults = posts?.filter(item =>
        item.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.name?.toLowerCase().includes(query.toLowerCase())
      ).map(item => ({
        id: item.id,
        title: item.title || item.name,
        url: `/blog/${item.slug || (item.title || item.name).toLowerCase().replace(/\s+/g, '-')}`,
        category: 'Blog',
        type: 'blog',
        icon: FileText
      })) || [];

      // Combine all results
      const allResults = [
        ...areaResults,
        ...serviceResults,
        ...reasonResults,
        ...blogResults
      ];

      setSearchResults({
        results: allResults,
        query: query,
        total: allResults.length
      });
      
      setLoading(false);
    }, 300);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle result click
  const handleResultClick = () => {
    onClose();
    setSearchQuery('');
    setSearchResults(null);
  };

  // Get icon component based on category
  const getIconComponent = (iconType) => {
    switch (iconType) {
      case MapPin:
        return <MapPin className="w-4 h-4" />;
      case Settings:
        return <Settings className="w-4 h-4" />;
      case Star:
        return <Star className="w-4 h-4" />;
      case FileText:
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search services, areas, blog posts..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>

        {/* Search Content */}
        <div className="max-h-96 overflow-y-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-blue-600 mr-2" />
              <span className="text-gray-600">Searching...</span>
            </div>
          )}

          {/* Search Results */}
          {searchResults && !loading && (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Found {searchResults.total} results for "{searchResults.query}"
                </h3>
              </div>

              {searchResults.results.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.results.map((result) => {
                    const IconComponent = result.icon;
                    return (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={result.url}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors group"
                        onClick={handleResultClick}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                            result.type === 'service-area' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' :
                            result.type === 'service' ? 'bg-green-100 text-green-600 group-hover:bg-green-200' :
                            result.type === 'reason' ? 'bg-orange-100 text-orange-600 group-hover:bg-orange-200' :
                            'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                          }`}>
                            {getIconComponent(result.icon)}
                          </div>
                          
                          <div className="flex flex-col">
                            <h4 className="text-base font-semibold text-gray-900">
                              {result.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs font-medium px-2 py-1 rounded ${
                                result.type === 'service-area' ? 'bg-blue-100 text-blue-700' :
                                result.type === 'service' ? 'bg-green-100 text-green-700' :
                                result.type === 'reason' ? 'bg-orange-100 text-orange-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {result.category}
                              </span>
                              {result.emirate && (
                                <span className="text-xs text-blue-600 font-medium">
                                  {result.emirate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    No matches found for "{searchResults.query}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Empty State - No Search Yet */}
          {!searchResults && !loading && (
            <div className="p-8 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Global Search
              </h3>
              <p className="text-gray-600 mb-6">
                Search across services, areas, blog posts, and more
              </p>
              
              {/* Quick Search Categories */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-blue-700">Service Areas</p>
                  <p className="text-xs text-blue-600">{serviceAreas?.length || 0} areas</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Settings className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-700">Services</p>
                  <p className="text-xs text-green-600">{services?.length || 0} services</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Star className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-orange-700">Why Choose Us</p>
                  <p className="text-xs text-orange-600">{reasons?.length || 0} reasons</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-purple-700">Blog Posts</p>
                  <p className="text-xs text-purple-600">{posts?.length || 0} posts</p>
                </div>
              </div>

              {/* Popular Search Suggestions */}
              <div className="flex flex-wrap justify-center gap-2">
                {serviceAreas?.slice(0, 4).map((area) => (
                  <button
                    key={area.id}
                    onClick={() => {
                      setSearchQuery(area.area);
                      performSearch(area.area);
                    }}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {area.area}
                  </button>
                ))}
                {services?.slice(0, 2).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSearchQuery(service.title || service.name);
                      performSearch(service.title || service.name);
                    }}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {service.title || service.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Search across all content</span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}