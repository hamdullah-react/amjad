'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from '@/components/ui/skeleton';
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
  Map,
  Package,
  Star,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

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

  const [formData, setFormData] = useState({
    city: '',
    emirate: '',
    area: '',
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
    'Abu Dhabi',
    'Dubai',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Umm Al Quwain'
  ];

  const deliveryTimes = [
    'Same Day',
    'Next Day',
    '2-3 Days',
    '3-5 Days',
    '1 Week'
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchServiceAreas(true);
    }, 300); // Debounce search

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
  };

  const openModal = (area = null) => {
    if (area) {
      setEditingArea(area);
      setFormData({
        city: area.city || '',
        emirate: area.emirate || '',
        area: area.area || '',
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
      } else {
        alert(result.message || 'Failed to save service area');
      }
    } catch (error) {
      console.error('Error saving service area:', error);
      alert('An error occurred while saving');
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
      }
    } catch (error) {
      console.error('Error deleting service area:', error);
    } finally {
      setDeleting(false);
    }
  };

  const filteredAreas = useMemo(() => {
    return serviceAreas.filter(area => {
      if (searchTerm &&
          !area.city.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !area.emirate.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !area.area?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [serviceAreas, searchTerm]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold">Service Areas</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-7 w-12" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Areas</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Active</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.active}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Primary</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.primary}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                  <Map className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Emirates</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.emirates}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gray-100 rounded-lg">
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.inactive}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 sm:p-4 rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            {searching ? (
              <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500 animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
      <div className="bg-white rounded-lg border overflow-hidden relative">
        {searching && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-sm text-gray-600">Searching service areas...</span>
            </div>
          </div>
        )}
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Location</th>
                <th className="text-left p-4 font-medium text-gray-900">Coverage</th>
                <th className="text-left p-4 font-medium text-gray-900">Delivery</th>
                <th className="text-left p-4 font-medium text-gray-900">Extra Charges</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="p-4">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-6 w-20" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="p-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                filteredAreas.map((area) => (
                  <React.Fragment key={area.id}>
                    <tr
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpandedRow(expandedRow === area.id ? null : area.id)}
                    >
                      <td className="p-4">
                        <div className="flex items-start gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900">
                                {area.city}
                                {area.area && <span className="text-gray-500"> - {area.area}</span>}
                              </p>
                              {area.isPrimary && (
                                <Star className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{area.emirate}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRow(expandedRow === area.id ? null : area.id);
                            }}
                            className="ml-auto"
                          >
                            {expandedRow === area.id ? (
                              <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {area.coverage.length} areas
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{area.deliveryTime || 'Standard'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {area.extraCharges ? (
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium">+{area.extraCharges} AED</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={area.isActive ? "default" : "secondary"}
                          className={area.isActive ? "bg-green-100 text-green-800" : ""}
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
                      <tr className="bg-gray-50">
                        <td colSpan="6" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {area.description && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                                <p className="text-sm text-gray-600">{area.description}</p>
                              </div>
                            )}
                            {area.coverage.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Coverage Areas</p>
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
                                <p className="text-sm font-medium text-gray-700 mb-1">Postal Codes</p>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            ))
          ) : (
            filteredAreas.map((area) => (
              <div key={area.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {area.city}
                        {area.area && <span className="text-gray-500"> - {area.area}</span>}
                      </p>
                      {area.isPrimary && (
                        <Star className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{area.emirate}</p>
                  </div>
                  <Badge
                    variant={area.isActive ? "default" : "secondary"}
                    className={`text-xs ${area.isActive ? "bg-green-100 text-green-800" : ""}`}
                  >
                    {area.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-600">
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
                  <p className="text-xs text-gray-600 mb-3">{area.description}</p>
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
            ))
          )}
        </div>

        {filteredAreas.length === 0 && !loading && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No service areas found</h3>
            <p className="text-gray-500 mb-4">Add your first service area to get started.</p>
            <Button onClick={() => openModal()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service Area
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
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
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="Specific area or district (optional)"
                />
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

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg">
                {editingArea ? 'Updating service area...' : 'Creating service area...'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Deleting Overlay */}
      {deleting && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg">Deleting service area...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}