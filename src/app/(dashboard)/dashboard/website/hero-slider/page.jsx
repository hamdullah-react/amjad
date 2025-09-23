'use client'

import { useState, useEffect } from 'react'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X, Image, ArrowUp, ArrowDown
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
import { ImagePicker } from "@/components/ui/image-picker"

const INITIAL_FORM_DATA = {
  title: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  buttonText: '',
  buttonUrl: '',
  order: 0,
  isActive: true
}

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

export default function HeroSliderPage() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewingSlide, setViewingSlide] = useState(null)
  const [editingSlide, setEditingSlide] = useState(null)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)

  // Fetch slides from API
  const fetchSlides = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/hero-slider')
      const result = await response.json()

      if (result.success) {
        setSlides(result.data)
      }
    } catch (error) {
      console.error('Error fetching slides:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlides()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleOpenDialog = (slide = null) => {
    if (slide) {
      setEditingSlide(slide)
      setFormData(slide)
    } else {
      setEditingSlide(null)
      setFormData({ ...INITIAL_FORM_DATA, order: slides.length + 1 })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingSlide(null)
    setFormData(INITIAL_FORM_DATA)
  }

  const handleViewSlide = (slide) => {
    setViewingSlide(slide)
    setViewDialogOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    setProcessingMessage(editingSlide ? 'Updating slide...' : 'Creating slide...')

    try {
      const url = editingSlide
        ? `/api/hero-slider/${editingSlide.id}`
        : '/api/hero-slider'

      const method = editingSlide ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        handleCloseDialog()
        fetchSlides()
      }
    } catch (error) {
      console.error('Error saving slide:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleToggleActive = async (slide) => {
    setProcessing(true)
    setProcessingMessage('Updating status...')
    try {
      const response = await fetch(`/api/hero-slider/${slide.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !slide.isActive }),
      })

      const data = await response.json()
      if (data.success) {
        fetchSlides()
      }
    } catch (error) {
      console.error('Error toggling active state:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleOrderChange = async (slide, direction) => {
    setProcessing(true)
    setProcessingMessage('Updating order...')

    try {
      const currentIndex = slides.findIndex(s => s.id === slide.id)
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

      if (newIndex < 0 || newIndex >= slides.length) return

      const targetSlide = slides[newIndex]

      // Swap orders
      await Promise.all([
        fetch(`/api/hero-slider/${slide.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: targetSlide.order })
        }),
        fetch(`/api/hero-slider/${targetSlide.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: slide.order })
        })
      ])

      fetchSlides()
    } catch (error) {
      console.error('Error changing order:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleDelete = async (slideId) => {
    if (!confirm('Are you sure you want to delete this slide?')) return

    setProcessing(true)
    setProcessingMessage('Deleting slide...')
    try {
      const response = await fetch(`/api/hero-slider/${slideId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        fetchSlides()
      }
    } catch (error) {
      console.error('Error deleting slide:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleImageSelect = (imageUrl) => {
    setFormData(prev => ({ ...prev, imageUrl }))
    setIsImagePickerOpen(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Hero Slider</h1>
        <p className="text-muted-foreground mt-2">Manage the hero slider images and content on your homepage</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Slides" value={slides.length} />
        <StatCard
          title="Active Slides"
          value={slides.filter(s => s.isActive).length}
          className="text-primary"
        />
        <StatCard
          title="Inactive Slides"
          value={slides.filter(s => !s.isActive).length}
          className="text-muted-foreground"
        />
      </div>

      {/* Slides Table */}
      <div className="bg-card rounded-lg shadow border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Hero Slides</h2>
            <Button
              onClick={() => handleOpenDialog()}
              disabled={processing}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Slide
            </Button>
          </div>
        </div>

        {slides.length === 0 ? (
          <div className="p-12 text-center">
            <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No slides found</p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Slide
            </Button>
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
                    Title & Subtitle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Button
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
                {slides.sort((a, b) => a.order - b.order).map((slide, index) => (
                  <tr
                    key={slide.id}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleViewSlide(slide)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-muted-foreground">{slide.order}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-20 h-12 rounded overflow-hidden bg-muted">
                        {slide.imageUrl ? (
                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{slide.title}</p>
                        {slide.subtitle && (
                          <p className="text-xs text-muted-foreground">{slide.subtitle}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-muted-foreground max-w-xs truncate">
                        {slide.description || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {slide.buttonText ? (
                        <span className="text-sm text-primary">{slide.buttonText}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">No button</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {slide.isActive ? (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOrderChange(slide, 'up')
                          }}
                          disabled={index === 0 || processing}
                          className="p-1 text-muted-foreground hover:text-muted-foreground disabled:opacity-50"
                          title="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOrderChange(slide, 'down')
                          }}
                          disabled={index === slides.length - 1 || processing}
                          className="p-1 text-muted-foreground hover:text-muted-foreground disabled:opacity-50"
                          title="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleActive(slide)
                          }}
                          className="p-1 text-muted-foreground hover:text-muted-foreground"
                          title={slide.isActive ? "Deactivate" : "Activate"}
                          disabled={processing}
                        >
                          {slide.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenDialog(slide)
                          }}
                          className="p-1 text-primary hover:text-primary/80"
                          title="Edit"
                          disabled={processing}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(slide.id)
                          }}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete"
                          disabled={processing}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90%] w-full max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>
              {editingSlide ? 'Edit Slide' : 'Add New Slide'}
            </DialogTitle>
            <DialogDescription>
              Configure the slide content and appearance
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto flex-1 pr-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Image *</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="Enter image URL or select from gallery"
                  className="flex-1"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsImagePickerOpen(true)}
                  className="sm:w-auto w-full"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Gallery
                </Button>
              </div>
              {formData.imageUrl && (
                <div className="mt-2 overflow-hidden rounded-lg">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL</Label>
                <Input
                  id="buttonUrl"
                  name="buttonUrl"
                  value={formData.buttonUrl}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {editingSlide ? 'Update' : 'Create'} Slide
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[90%] w-full max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Slide Details</DialogTitle>
            <DialogDescription>
              Complete information about this slide
            </DialogDescription>
          </DialogHeader>

          {viewingSlide && (
            <div className="space-y-6 overflow-y-auto flex-1 pr-2">
              {/* Image Preview */}
              {viewingSlide.imageUrl && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Slide Image</p>
                  <img
                    src={viewingSlide.imageUrl}
                    alt={viewingSlide.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Content Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Title</p>
                    <p className="font-medium break-words">{viewingSlide.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Subtitle</p>
                    <p className="font-medium break-words">{viewingSlide.subtitle || 'Not set'}</p>
                  </div>
                </div>
                {viewingSlide.description && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-foreground break-words">{viewingSlide.description}</p>
                  </div>
                )}
              </div>

              {/* Button Configuration */}
              {(viewingSlide.buttonText || viewingSlide.buttonUrl) && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Button Configuration</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Button Text</p>
                      <p className="font-medium break-words">{viewingSlide.buttonText || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Button URL</p>
                      <p className="font-medium text-primary break-all">{viewingSlide.buttonUrl || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status & Metadata */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Status & Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order</p>
                    <p className="font-medium">{viewingSlide.order}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    {viewingSlide.isActive ? (
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
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setViewDialogOpen(false)
                    handleOpenDialog(viewingSlide)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Slide
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Picker Dialog */}
      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={handleImageSelect}
      />

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
    </div>
  )
}