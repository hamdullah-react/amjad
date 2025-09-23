'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X, Star,
  MapPin, Building, User, Mail, Quote
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
  name: '',
  email: '',
  company: '',
  position: '',
  content: '',
  rating: 5,
  imageUrl: '',
  service: '',
  location: '',
  isFeatured: false,
  isActive: true
}

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

const RatingStars = ({ rating, onClick, size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onClick && onClick(star)}
          className={onClick ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`${sizeClasses} ${
              star <= rating
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

const TestimonialRow = ({ testimonial, onToggleActive, onToggleFeatured, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-muted/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
          {testimonial.imageUrl ? (
            <img
              src={testimonial.imageUrl}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect width="48" height="48" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" font-size="18" fill="%236b7280" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3E%3F%3C/text%3E%3C/svg%3E'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.email || '-'}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          {testimonial.company && (
            <div className="flex items-center gap-1">
              <Building className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">{testimonial.company}</span>
            </div>
          )}
          {testimonial.position && (
            <p className="text-xs text-muted-foreground">{testimonial.position}</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-muted-foreground max-w-xs truncate">{testimonial.content}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <RatingStars rating={testimonial.rating} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {testimonial.service && (
          <span className="text-sm text-muted-foreground">{testimonial.service}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          {testimonial.isFeatured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Featured
            </span>
          )}
          {testimonial.isActive ? (
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
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFeatured(testimonial)}
            className="p-1 text-primary hover:text-primary/80"
            title={testimonial.isFeatured ? "Unfeature" : "Feature"}
          >
            <Star className={`w-4 h-4 ${testimonial.isFeatured ? 'fill-primary' : ''}`} />
          </button>
          <button
            onClick={() => onToggleActive(testimonial)}
            className="p-1 text-muted-foreground hover:text-muted-foreground"
            title={testimonial.isActive ? "Deactivate" : "Activate"}
          >
            {testimonial.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(testimonial)}
            className="p-1 text-primary hover:text-primary/80"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(testimonial.id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

const TestimonialForm = ({ formData, setFormData, isImagePickerOpen, setIsImagePickerOpen }) => {
  const handleImageSelect = useCallback((imageUrl) => {
    setFormData(prev => ({ ...prev, imageUrl }))
    setIsImagePickerOpen(false)
  }, [setFormData, setIsImagePickerOpen])

  return (
    <>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter customer name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="customer@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Testimonial *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter testimonial content"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Customer Image</Label>
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
                <User className="w-4 h-4 mr-2" />
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
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Job title"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Input
              id="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              placeholder="Service used"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City or area"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isFeatured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
            />
            <Label htmlFor="isFeatured">Featured</Label>
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

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [filteredTestimonials, setFilteredTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  // Statistics
  const stats = useMemo(() => ({
    total: testimonials.length,
    active: testimonials.filter(t => t.isActive).length,
    featured: testimonials.filter(t => t.isFeatured).length,
    avgRating: testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : '0.0'
  }), [testimonials])

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/testimonials')
      const result = await response.json()

      if (result.success) {
        setTestimonials(result.data)
        setFilteredTestimonials(result.data)
      } else {
        console.error('Failed to fetch testimonials:', result.message)
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials()
  }, [])

  // Filter testimonials based on search term and status
  useEffect(() => {
    let filtered = testimonials

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (testimonial.company && testimonial.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (testimonial.service && testimonial.service.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply status filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(t => t.isActive)
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(t => !t.isActive)
    } else if (statusFilter === 'featured') {
      filtered = filtered.filter(t => t.isFeatured)
    }

    setFilteredTestimonials(filtered)
  }, [testimonials, searchTerm, statusFilter])

  const handleAdd = () => {
    setEditingTestimonial(null)
    setFormData(INITIAL_FORM_DATA)
    setIsModalOpen(true)
  }

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      email: testimonial.email || '',
      company: testimonial.company || '',
      position: testimonial.position || '',
      content: testimonial.content,
      rating: testimonial.rating,
      imageUrl: testimonial.imageUrl || '',
      service: testimonial.service || '',
      location: testimonial.location || '',
      isFeatured: testimonial.isFeatured,
      isActive: testimonial.isActive
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setProcessing(true)
      setProcessingMessage(editingTestimonial ? 'Updating testimonial...' : 'Creating testimonial...')

      const url = editingTestimonial
        ? `/api/testimonials/${editingTestimonial.id}`
        : '/api/testimonials'

      const method = editingTestimonial ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setIsModalOpen(false)
        setEditingTestimonial(null)
        setFormData(INITIAL_FORM_DATA)
        await fetchTestimonials()
      } else {
        console.error('Failed to save testimonial:', result.message)
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      setProcessing(true)
      setProcessingMessage('Deleting testimonial...')

      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        await fetchTestimonials()
      } else {
        console.error('Failed to delete testimonial:', result.message)
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleToggleStatus = async (testimonial) => {
    try {
      setProcessing(true)
      setProcessingMessage('Updating status...')

      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testimonial,
          isActive: !testimonial.isActive
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchTestimonials()
      } else {
        console.error('Failed to toggle status:', result.message)
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleToggleFeatured = async (testimonial) => {
    try {
      setProcessing(true)
      setProcessingMessage('Updating featured status...')

      const response = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testimonial,
          isFeatured: !testimonial.isFeatured
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchTestimonials()
      } else {
        console.error('Failed to toggle featured status:', result.message)
      }
    } catch (error) {
      console.error('Error toggling featured status:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTestimonial(null)
    setFormData(INITIAL_FORM_DATA)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
        <p className="text-muted-foreground mt-2">Manage customer testimonials and reviews</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Testimonials" value={stats.total} />
        <StatCard title="Active" value={stats.active} className="text-primary" />
        <StatCard title="Featured" value={stats.featured} className="text-primary" />
        <StatCard title="Avg Rating" value={`${stats.avgRating} ⭐`} className="text-primary" />
      </div>

      {/* Testimonials Table */}
      <div className="bg-card rounded-lg shadow border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-foreground">Customer Testimonials</h2>
            <Button
              onClick={handleAdd}
              disabled={processing}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </div>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search testimonials..."
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
                <SelectItem value="all">All Testimonials</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
                <SelectItem value="featured">Featured Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="text-muted-foreground">Loading testimonials...</div>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="p-12 text-center">
            <Quote className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No testimonials found</p>
            <p className="text-muted-foreground mt-2">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Click "Add Testimonial" to create your first testimonial'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Testimonial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTestimonials.map((testimonial) => (
                  <TestimonialRow
                    key={testimonial.id}
                    testimonial={testimonial}
                    onToggleActive={handleToggleStatus}
                    onToggleFeatured={handleToggleFeatured}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-card rounded-lg p-6 shadow-xl border">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-lg font-medium text-foreground">{processingMessage || 'Processing...'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            <DialogDescription>
              {editingTestimonial ? 'Update the testimonial details' : 'Create a new customer testimonial'}
            </DialogDescription>
          </DialogHeader>

          <TestimonialForm
            formData={formData}
            setFormData={setFormData}
            isImagePickerOpen={isImagePickerOpen}
            setIsImagePickerOpen={setIsImagePickerOpen}
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={processing || !formData.name || !formData.content}
            >
              <Save className="w-4 h-4 mr-2" />
              {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}