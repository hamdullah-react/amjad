'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MapPin,
  Clock,
  DollarSign,
  X,
  Save,
  Loader2,
  Star,
  ChevronDown,
  ChevronUp,
  Link,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';




// Helper function to generate slug from title
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export default function ServiceAreasPage() {
  const [serviceAreas, setServiceAreas] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    primary: 0,
    emirates: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [emirateFilter, setEmirateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [newCoverage, setNewCoverage] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [isManualSlug, setIsManualSlug] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const [formData, setFormData] = useState({
    city: '',
    emirate: '',
    area: '',
    slug: '',
    description: '',
    coverage: [],
    postalCodes: [],
    isActive: true,
    isPrimary: false,
    deliveryTime: '',
    extraCharges: '',
    order: 0
  });

const emirates = [
  "Deira",
  "Bur Dubai",
  "Downtown Dubai",
  "Business Bay",
  "Dubai Marina",
  "Jumeirah",
  "Palm Jumeirah",
  "Dubai Creek Harbour",
  "Dubai Hills Estate",
  "Arabian Ranches",
  "Al Barsha",
  "Al Quoz",
  "Al Karama",
  "Al Nahda",
  "Al Hamriya",
  "Jumeirah Lake Towers (JLT)",
  "Dubai Sports City",
  "Dubai Silicon Oasis",
  "Motor City",
  "International City"
];
  const deliveryTimes = [
    'Same Day',
    'Next Day',
    '2-3 Days',
    '3-5 Days',
    '1 Week'
  ];

  // Auto-generate slug when city/area changes
  useEffect(() => {
    if ((formData.city || formData.area) && !isManualSlug) {
      const slugText = formData.area ? `${formData.city}-${formData.area}` : formData.city;
      const generatedSlug = generateSlug(slugText);
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.city, formData.area, isManualSlug]);

  // Reset manual slug flag when editing area changes
  useEffect(() => {
    setIsManualSlug(false);
  }, [editingArea]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchServiceAreas(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, emirateFilter, statusFilter]);

  const fetchServiceAreas = async (showSearchLoader = false) => {
    try {
      if (showSearchLoader) setSearching(true);

      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (emirateFilter !== 'all') params.append('emirate', emirateFilter);
      if (statusFilter !== 'all') {
        params.append('isActive', statusFilter === 'active' ? 'true' : 'false');
      }

      const response = await fetch(`/api/service-areas?${params}`);
      const result = await response.json();

      if (result.success) {
        setServiceAreas(result.data);
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error fetching service areas:', error);
    } finally {
      setLoading(false);
      if (showSearchLoader) setSearching(false);
    }
  };

  const resetForm = () => {
    setFormData({
      city: '',
      emirate: '',
      area: '',
      slug: '',
      description: '',
      coverage: [],
      postalCodes: [],
      isActive: true,
      isPrimary: false,
      deliveryTime: '',
      extraCharges: '',
      order: 0
    });
    setEditingArea(null);
    setNewCoverage('');
    setNewPostalCode('');
    setIsManualSlug(false);
  };

  const openModal = (area = null) => {
    if (area) {
      setEditingArea(area);
      setFormData({
        city: area.city || '',
        emirate: area.emirate || '',
        area: area.area || '',
        slug: area.slug || '',
        description: area.description || '',
        coverage: area.coverage || [],
        postalCodes: area.postalCodes || [],
        isActive: area.isActive !== undefined ? area.isActive : true,
        isPrimary: area.isPrimary || false,
        deliveryTime: area.deliveryTime || '',
        extraCharges: area.extraCharges || '',
        order: area.order || 0
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const addCoverage = () => {
    if (newCoverage.trim() && !formData.coverage.includes(newCoverage.trim())) {
      setFormData({
        ...formData,
        coverage: [...formData.coverage, newCoverage.trim()]
      });
      setNewCoverage('');
    }
  };

  const removeCoverage = (index) => {
    setFormData({
      ...formData,
      coverage: formData.coverage.filter((_, i) => i !== index)
    });
  };

  const addPostalCode = () => {
    if (newPostalCode.trim() && !formData.postalCodes.includes(newPostalCode.trim())) {
      setFormData({
        ...formData,
        postalCodes: [...formData.postalCodes, newPostalCode.trim()]
      });
      setNewPostalCode('');
    }
  };

  const removePostalCode = (index) => {
    setFormData({
      ...formData,
      postalCodes: formData.postalCodes.filter((_, i) => i !== index)
    });
  };

  const handleSlugChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, slug: value }));
    
    // If user manually edits the slug, mark it as manual
    const slugText = formData.area ? `${formData.city}-${formData.area}` : formData.city;
    if (value !== generateSlug(slugText)) {
      setIsManualSlug(true);
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, city: value }));
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, area: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const url = editingArea ? `/api/service-areas/${editingArea.id}` : '/api/service-areas';
      const method = editingArea ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        await fetchServiceAreas();
        closeModal();
        showFeedback('success', editingArea ? 'Service area updated successfully' : 'Service area created successfully');
      } else {
        showFeedback('error', result.message || 'Failed to save service area');
      }
    } catch (error) {
      console.error('Error saving service area:', error);
      showFeedback('error', 'An error occurred while saving');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (areaId) => {
    if (!confirm('Are you sure you want to delete this service area?')) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/service-areas/${areaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchServiceAreas();
        showFeedback('success', 'Service area deleted successfully');
      } else {
        showFeedback('error', 'Failed to delete service area');
      }
    } catch (error) {
      console.error('Error deleting service area:', error);
      showFeedback('error', 'An error occurred while deleting');
    } finally {
      setDeleting(false);
    }
  };

  const filteredAreas = useMemo(() => {
    return serviceAreas.filter(area => {
      if (searchTerm &&
          !area.city.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !area.emirate.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !area.area?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !area.slug?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [serviceAreas, searchTerm]);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading service areas...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Service Areas</h1>
          <p className="text-muted-foreground mt-2">
            Manage your service coverage areas
          </p>
        </div>
        <Button
          onClick={() => openModal()}
          disabled={processing || deleting}
          className="w-full sm:w-auto"
        >
          {processing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Add Service Area
        </Button>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium ${
          feedback.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200'
            : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="ml-auto text-current opacity-60 hover:opacity-100">&times;</button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Total Areas</div>
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Active</div>
          <div className="text-2xl font-bold text-foreground">{stats.active}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Primary</div>
          <div className="text-2xl font-bold text-foreground">{stats.primary}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Emirates</div>
          <div className="text-2xl font-bold text-foreground">{stats.emirates}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-3 sm:p-4 rounded-lg border mb-6">
        <div className="flex-1">
          <div className="relative">
            {searching ? (
              <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              placeholder="Search areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
              disabled={searching}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={emirateFilter} onValueChange={setEmirateFilter} disabled={searching || deleting}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Emirate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Emirates</SelectItem>
              {emirates.map(emirate => (
                <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter} disabled={searching || deleting}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table/Cards */}
      <div className="bg-card rounded-lg border overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Location</th>
                <th className="text-left p-4 font-medium text-foreground">Slug</th>
                <th className="text-left p-4 font-medium text-foreground">Coverage</th>
                <th className="text-left p-4 font-medium text-foreground">Delivery</th>
                <th className="text-left p-4 font-medium text-foreground">Extra Charges</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAreas.map((area) => (
                  <React.Fragment key={area.id}>
                    <tr
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => setExpandedRow(expandedRow === area.id ? null : area.id)}
                    >
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-foreground">
                                {area.city}
                                {area.area && <span className="text-muted-foreground"> - {area.area}</span>}
                              </p>
                              {area.isPrimary && (
                                <Star className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{area.emirate}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRow(expandedRow === area.id ? null : area.id);
                            }}
                            className="ml-auto"
                          >
                            {expandedRow === area.id ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        {area.slug && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Link className="h-3 w-3" />
                            /areas/{area.slug}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {area.coverage.length} areas
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{area.deliveryTime || 'Standard'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {area.extraCharges ? (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">+{area.extraCharges} AED</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={area.isActive ? "default" : "secondary"}
                          className={area.isActive ? "bg-primary/10 text-primary" : ""}
                        >
                          {area.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(area);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(area.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {expandedRow === area.id && (
                      <tr className="bg-muted/50">
                        <td colSpan="7" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {area.description && (
                              <div>
                                <p className="text-sm font-medium text-foreground mb-1">Description</p>
                                <p className="text-sm text-muted-foreground">{area.description}</p>
                              </div>
                            )}
                            {area.coverage.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-foreground mb-1">Coverage Areas</p>
                                <div className="flex flex-wrap gap-1">
                                  {area.coverage.map((location, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {location}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {area.postalCodes.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-foreground mb-1">Postal Codes</p>
                                <div className="flex flex-wrap gap-1">
                                  {area.postalCodes.map((code, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {code}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-border">
          {filteredAreas.map((area) => (
              <div key={area.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">
                        {area.city}
                        {area.area && <span className="text-muted-foreground"> - {area.area}</span>}
                      </p>
                      {area.isPrimary && (
                        <Star className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{area.emirate}</p>
                    {area.slug && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Link className="h-3 w-3" />
                        /areas/{area.slug}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={area.isActive ? "default" : "secondary"}
                    className={`text-xs ${area.isActive ? "bg-primary/10 text-primary" : ""}`}
                  >
                    {area.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-3 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {area.coverage.length} areas
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {area.deliveryTime || 'Standard'}
                  </span>
                  {area.extraCharges && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      +{area.extraCharges} AED
                    </span>
                  )}
                </div>

                {area.description && (
                  <p className="text-xs text-muted-foreground mb-3">{area.description}</p>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openModal(area)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(area.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
        </div>

        {filteredAreas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <AlertCircle className="w-10 h-10 mb-3" />
            <p className="text-lg font-medium">No service areas found</p>
            <p className="text-sm">Add your first service area to get started.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-[90%] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-card z-10">
              <h2 className="text-lg sm:text-xl font-semibold">
                {editingArea ? 'Edit Service Area' : 'Add Service Area'}
              </h2>
              <Button variant="ghost" size="sm" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emirate">Emirate *</Label>
                  <Select
                    value={formData.emirate}
                    onValueChange={(value) => setFormData({ ...formData, emirate: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select emirate" />
                    </SelectTrigger>
                    <SelectContent>
                      {emirates.map(emirate => (
                        <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleCityChange}
                    placeholder="Enter city name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area/District</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={handleAreaChange}
                  placeholder="Specific area or district (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  placeholder="area-slug"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  URL-friendly version. Will be used in the area URL: /areas/your-slug
                  {isManualSlug && <span className="text-amber-600 ml-1">(Manual edit)</span>}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about this service area"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Coverage Areas</Label>
                <div className="flex gap-2">
                  <Input
                    value={newCoverage}
                    onChange={(e) => setNewCoverage(e.target.value)}
                    placeholder="Add neighborhood or location"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoverage())}
                  />
                  <Button onClick={addCoverage} type="button" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.coverage.map((location, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {location}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeCoverage(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Postal Codes</Label>
                <div className="flex gap-2">
                  <Input
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    placeholder="Add postal code"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPostalCode())}
                  />
                  <Button onClick={addPostalCode} type="button" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.postalCodes.map((code, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {code}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removePostalCode(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Select
                    value={formData.deliveryTime}
                    onValueChange={(value) => setFormData({ ...formData, deliveryTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryTimes.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extraCharges">Extra Charges (AED)</Label>
                  <Input
                    id="extraCharges"
                    type="number"
                    step="0.01"
                    value={formData.extraCharges}
                    onChange={(e) => setFormData({ ...formData, extraCharges: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPrimary"
                    checked={formData.isPrimary}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPrimary: checked })}
                  />
                  <Label htmlFor="isPrimary">Primary Area</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={closeModal} disabled={processing}>
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {editingArea ? 'Update' : 'Create'} Service Area
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}