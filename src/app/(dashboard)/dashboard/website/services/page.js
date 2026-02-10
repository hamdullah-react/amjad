'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X, Package,
  DollarSign, ArrowUp, ArrowDown, Link, Calendar, Tag, CheckCircle, XCircle, Loader2, AlertCircle
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePicker } from "@/components/ui/image-picker"

const INITIAL_FORM_DATA = {
  title: 'Home Moving Service',
  slug: 'home-moving-service',
  description: `We provide professional home moving services including packing, loading, transportation, and unpacking. Our expert movers ensure your furniture and belongings are safely delivered to your new location — on time and with care.`,
  shortDesc: 'Safe and affordable home moving service for apartments and villas.',
  icon: '/icons/home-moving.svg', // replace with your actual icon path
  imageUrl: '/images/services/home-moving.jpg',
  price: '499', // SAR or any currency
  features: [
    'Professional packing materials',
    'Disassembly and reassembly of furniture',
    'Secure transportation with GPS tracking',
    'Unloading and unpacking at destination',
    'Optional cleaning and setup services'
  ],
  order: 1,
  isActive: true
};



// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to truncate text
const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-card rounded-lg shadow p-4">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {service.title}
          </DialogTitle>
          <DialogDescription>
            Complete service details and information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-64 h-48 rounded-lg overflow-hidden bg-muted">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="256" height="192"%3E%3Crect width="256" height="192" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="18" fill="%236b7280" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Slug</label>
                    <p className="text-sm text-foreground flex items-center gap-1 mt-1">
                      <Link className="w-4 h-4" />
                      /services/{service.slug}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Display Order</label>
                    <p className="text-sm text-foreground mt-1">{service.order}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      {service.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          <Eye className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          <EyeOff className="w-3 h-3" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  {service.price && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Price</label>
                      <p className="text-sm text-foreground flex items-center gap-1 mt-1">
                        <DollarSign className="w-4 h-4" />
                        {service.price}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {service.shortDesc && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Short Description</label>
                  <p className="text-sm text-foreground mt-1">{service.shortDesc}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {service.description}
              </p>
            </div>
          </div>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded"
                  >
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <label className="text-sm font-medium text-muted-foreground">Total Features</label>
              <p className="text-2xl font-bold text-foreground mt-1">
                {service.features?.length || 0}
              </p>
            </div>
            <div className="text-center">
              <label className="text-sm font-medium text-muted-foreground">Icon</label>
              <p className="text-sm text-foreground mt-1">
                {service.icon || 'No icon'}
              </p>
            </div>
            <div className="text-center">
              <label className="text-sm font-medium text-muted-foreground">Has Image</label>
              <p className="text-sm text-foreground mt-1">
                {service.imageUrl ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ServiceRow = ({ service, index, totalServices, onToggleActive, onEdit, onDelete, onOrderChange, processing, onView }) => {
  return (
    <tr 
      className="hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => onView(service)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-muted-foreground">{service.order}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
          {service.imageUrl ? (
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="18" fill="%236b7280" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3E%3F%3C/text%3E%3C/svg%3E'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-foreground">{service.title}</p>
          {service.slug && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Link className="w-3 h-3" />
              /services/{service.slug}
            </p>
          )}
          {service.shortDesc && (
            <p className="text-xs text-muted-foreground mt-1">
              {truncateText(service.shortDesc, 60)}
            </p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-muted-foreground max-w-xs">
          {truncateText(service.description, 80)}
        </p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {service.price ? (
          <span className="flex items-center text-primary font-medium">
            <DollarSign className="h-4 w-4" />
            {service.price}
          </span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </td>
      <td className="px-6 py-4">
        {service.features && service.features.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 2).map((feature, i) => (
              <span key={i} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                {truncateText(feature, 15)}
              </span>
            ))}
            {service.features.length > 2 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                +{service.features.length - 2}
              </span>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">No features</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {service.isActive ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <Eye className="w-3 h-3" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            <EyeOff className="w-3 h-3" />
            Inactive
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOrderChange(service, 'up')}
            disabled={index === 0 || processing}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
            title="Move up"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOrderChange(service, 'down')}
            disabled={index === totalServices - 1 || processing}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
            title="Move down"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleActive(service)}
            className="p-1 text-muted-foreground hover:text-foreground"
            title={service.isActive ? "Deactivate" : "Activate"}
          >
            {service.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(service)}
            className="p-1 text-primary hover:text-primary/80"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(service.id)}
            className="p-1 text-destructive hover:text-destructive/90"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

const ServiceForm = ({ formData, setFormData, isImagePickerOpen, setIsImagePickerOpen, newFeature, setNewFeature, editingService }) => {
  const [isManualSlug, setIsManualSlug] = useState(false)

  useEffect(() => {
    if (formData.title && !isManualSlug) {
      const generatedSlug = generateSlug(formData.title)
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
  }, [formData.title, isManualSlug, setFormData])

  useEffect(() => {
    setIsManualSlug(false)
  }, [editingService])

  const handleImageSelect = useCallback((imageUrl) => {
    setFormData(prev => ({ ...prev, imageUrl }))
    setIsImagePickerOpen(false)
  }, [setFormData, setIsImagePickerOpen])

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSlugChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, slug: value }))
    
    if (value !== generateSlug(formData.title)) {
      setIsManualSlug(true)
    }
  }

  const handleTitleChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, title: value }))
  }

  return (
    <>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter service title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              min="1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={handleSlugChange}
            placeholder="service-slug"
          />
          <p className="text-xs text-muted-foreground">
            URL-friendly version of the title. Will be used in the service URL: /services/your-slug
            {isManualSlug && <span className="text-amber-600 ml-1">(Manual edit)</span>}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDesc">Short Description</Label>
          <Input
            id="shortDesc"
            value={formData.shortDesc}
            onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
            placeholder="Brief summary of the service"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter service description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Image</Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsImagePickerOpen(true)}
              >
                <Package className="w-4 h-4 mr-2" />
                Gallery
              </Button>
            </div>
            {formData.imageUrl && (
              <div className="mt-2">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-32 h-24 object-cover rounded border"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Service price (optional)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g., truck, package"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Features</Label>
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addFeature()
                }
              }}
            />
            <Button type="button" onClick={addFeature} variant="outline">
              Add
            </Button>
          </div>
          {formData.features.length > 0 && (
            <div className="mt-2 space-y-1">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded"
                >
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>
      </div>

      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={handleImageSelect}
        selectedImageUrl={formData.imageUrl}
      />
    </>
  )
}

export default function ServicesContentPage() {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const showFeedback = (type, message) => {
    setFeedback({ type, message })
    setTimeout(() => setFeedback(null), 4000)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  const stats = useMemo(() => ({
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length,
    withPrice: services.filter(s => s.price).length
  }), [services])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/services')
      const result = await response.json()

      if (result.success) {
        setServices(result.data)
        setFilteredServices(result.data)
      } else {
        console.error('Failed to fetch services:', result.message)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    let filtered = services

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (service.shortDesc && service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(service =>
        statusFilter === 'active' ? service.isActive : !service.isActive
      )
    }

    setFilteredServices(filtered)
  }, [services, searchTerm, statusFilter])

  const handleView = (service) => {
    setSelectedService(service)
    setIsDetailModalOpen(true)
  }

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      ...INITIAL_FORM_DATA,
      order: services.length + 1
    })
    setIsModalOpen(true)
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      shortDesc: service.shortDesc || '',
      icon: service.icon || '',
      imageUrl: service.imageUrl || '',
      price: service.price || '',
      features: service.features || [],
      order: service.order,
      isActive: service.isActive
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setProcessing(true)

      const url = editingService
        ? `/api/services/${editingService.id}`
        : '/api/services'

      const method = editingService ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server error:', errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setIsModalOpen(false)
        setEditingService(null)
        setFormData(INITIAL_FORM_DATA)
        setNewFeature('')
        await fetchServices()
        showFeedback('success', editingService ? 'Service updated successfully!' : 'Service created successfully!')
      } else {
        console.error('Failed to save service:', result.message)
        showFeedback('error', result.message || 'Failed to save service')
      }
    } catch (error) {
      console.error('Error saving service:', error)
      showFeedback('error', `Error saving service: ${error.message}`)
    } finally {
      setProcessing(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      setProcessing(true)

      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        await fetchServices()
        showFeedback('success', 'Service deleted successfully!')
      } else {
        showFeedback('error', result.message || 'Failed to delete service')
        console.error('Failed to delete service:', result.message)
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      showFeedback('error', 'Error deleting service')
    } finally {
      setProcessing(false)
    }
  }

  const handleToggleStatus = async (service) => {
    try {
      setProcessing(true)

      const response = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...service,
          isActive: !service.isActive
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchServices()
        showFeedback('success', `Service ${!service.isActive ? 'activated' : 'deactivated'} successfully!`)
      } else {
        console.error('Failed to toggle service status:', result.message)
        showFeedback('error', 'Failed to update service status')
      }
    } catch (error) {
      console.error('Error toggling service status:', error)
      showFeedback('error', 'Error updating service status')
    } finally {
      setProcessing(false)
    }
  }

  const handleOrderChange = async (service, direction) => {
    const currentIndex = services.findIndex(s => s.id === service.id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= services.length) return

    const otherService = services[newIndex]

    try {
      setProcessing(true)

      await Promise.all([
        fetch(`/api/services/${service.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...service,
            order: otherService.order
          })
        }),
        fetch(`/api/services/${otherService.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...otherService,
            order: service.order
          })
        })
      ])

      await fetchServices()
      showFeedback('success', 'Service order updated!')
    } catch (error) {
      console.error('Error changing order:', error)
      showFeedback('error', 'Error changing service order')
    } finally {
      setProcessing(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingService(null)
    setFormData(INITIAL_FORM_DATA)
    setNewFeature('')
  }

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading services...</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Services Content</h1>
        <p className="text-muted-foreground mt-2">Manage your website services and offerings</p>
      </div>

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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Services" value={stats.total} />
        <StatCard title="Active" value={stats.active} className="text-primary" />
        <StatCard title="Inactive" value={stats.inactive} className="text-muted-foreground" />
        <StatCard title="With Pricing" value={stats.withPrice} className="text-primary" />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAdd}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-card rounded-lg shadow overflow-hidden">
        {filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <AlertCircle className="w-10 h-10 mb-3" />
            <p className="text-lg font-medium">No services found</p>
            <p className="text-sm">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Add your first service to get started.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {filteredServices.map((service, index) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    index={index}
                    totalServices={filteredServices.length}
                    onToggleActive={handleToggleStatus}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onOrderChange={handleOrderChange}
                    onView={handleView}
                    processing={processing}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              {editingService ? 'Update the service details' : 'Create a new service for your website'}
            </DialogDescription>
          </DialogHeader>

          <ServiceForm
            formData={formData}
            setFormData={setFormData}
            isImagePickerOpen={isImagePickerOpen}
            setIsImagePickerOpen={setIsImagePickerOpen}
            newFeature={newFeature}
            setNewFeature={setNewFeature}
            editingService={editingService}
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={processing || !formData.title || !formData.description || !formData.slug}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingService ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}