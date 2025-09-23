'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, Image, Save, X } from 'lucide-react'
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

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingImage, setEditingImage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'general',
    tags: [],
    order: 0,
    isActive: true
  })

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/gallery')
      const result = await response.json()

      if (result.success) {
        setImages(result.data)
        setFilteredImages(result.data)
      } else {
        console.error('Failed to fetch images:', result.message)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load images on component mount
  useEffect(() => {
    fetchImages()
  }, [])

  // Filter images based on search term, category, and status
  useEffect(() => {
    let filtered = images

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(image =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (image.description && image.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        image.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(image => image.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(image =>
        statusFilter === 'active' ? image.isActive : !image.isActive
      )
    }

    setFilteredImages(filtered)
  }, [images, searchTerm, categoryFilter, statusFilter])

  const handleAdd = () => {
    setEditingImage(null)
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'general',
      tags: [],
      order: images.length + 1,
      isActive: true
    })
    setIsModalOpen(true)
  }

  const handleEdit = (image) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      description: image.description || '',
      imageUrl: image.imageUrl,
      category: image.category,
      tags: image.tags || [],
      order: image.order,
      isActive: image.isActive
    })
    setIsModalOpen(true)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('category', formData.category)
      uploadFormData.append('title', formData.title || file.name)
      uploadFormData.append('description', formData.description)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      const result = await response.json()

      if (result.success) {
        setFormData({
          ...formData,
          imageUrl: result.data.url,
          title: formData.title || result.data.title
        })
      } else {
        alert('Failed to upload image: ' + result.message)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setProcessing(true)
      setProcessingMessage(editingImage ? 'Updating image...' : 'Creating image...')

      const url = editingImage
        ? `/api/gallery/${editingImage.id}`
        : '/api/gallery'

      const method = editingImage ? 'PUT' : 'POST'

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
        setEditingImage(null)
        setFormData({
          title: '',
          description: '',
          imageUrl: '',
          category: 'general',
          tags: [],
          order: 0,
          isActive: true
        })
        setUploading(false)
        await fetchImages() // Refresh the list
      } else {
        console.error('Failed to save image:', result.message)
        alert('Failed to save image: ' + result.message)
      }
    } catch (error) {
      console.error('Error saving image:', error)
      alert('Error saving image')
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      try {
        setProcessing(true)
        setProcessingMessage('Deleting image...')

        const response = await fetch(`/api/gallery/${id}`, {
          method: 'DELETE'
        })

        const result = await response.json()

        if (result.success) {
          await fetchImages() // Refresh the list
        } else {
          console.error('Failed to delete image:', result.message)
          alert('Failed to delete image')
        }
      } catch (error) {
        console.error('Error deleting image:', error)
        alert('Error deleting image')
      } finally {
        setProcessing(false)
        setProcessingMessage('')
      }
    }
  }

  const handleToggleActive = async (image) => {
    try {
      setProcessing(true)
      setProcessingMessage('Updating status...')

      const response = await fetch(`/api/gallery/${image.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...image,
          isActive: !image.isActive
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchImages() // Refresh the list
      } else {
        console.error('Failed to toggle image status:', result.message)
      }
    } catch (error) {
      console.error('Error toggling image status:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const categories = [...new Set(images.map(img => img.category))]

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading gallery...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
        <p className="text-muted-foreground mt-2">Manage your website gallery images</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg shadow p-4">
          <div className="text-sm text-muted-foreground">Total Images</div>
          <div className="text-2xl font-bold text-foreground">{images.length}</div>
        </div>
        <div className="bg-card rounded-lg shadow p-4">
          <div className="text-sm text-muted-foreground">Active Images</div>
          <div className="text-2xl font-bold text-primary">
            {images.filter(img => img.isActive).length}
          </div>
        </div>
        <div className="bg-card rounded-lg shadow p-4">
          <div className="text-sm text-muted-foreground">Categories</div>
          <div className="text-2xl font-bold text-primary">{categories.length}</div>
        </div>
        <div className="bg-card rounded-lg shadow p-4">
          <div className="text-sm text-muted-foreground">Last Updated</div>
          <div className="text-sm font-semibold text-foreground">
            {images.length > 0 ? new Date(images[0].updatedAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search images..."
            className="w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Images Grid */}
      <div className="bg-card rounded-lg shadow overflow-hidden">
        {filteredImages.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {images.length === 0 ? "No images found. Upload your first image!" : "No images match your search criteria."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 p-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="relative group bg-muted/50 rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-12 bg-muted">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', image.imageUrl)
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" font-size="18" fill="%23999" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3EImage Not Found%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(image)}
                      className="p-2 bg-card rounded-full text-primary hover:text-primary/80"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(image)}
                      className="p-2 bg-card rounded-full text-muted-foreground hover:text-foreground"
                    >
                      {image.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 bg-card rounded-full text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground truncate">{image.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{image.description || 'No description'}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {image.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      image.isActive
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {image.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
            <DialogDescription>
              {editingImage ? 'Update the image details' : 'Upload a new image to the gallery'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter image title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="slider">Slider</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="testimonials">Testimonials</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter image description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground self-center">or</span>
                <Input
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="flex-1"
                />
              </div>
              {uploading && (
                <p className="text-sm text-primary">Uploading image...</p>
              )}
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded border"
                    onError={(e) => {
                      console.error('Preview image failed to load:', formData.imageUrl)
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="96"%3E%3Crect width="128" height="96" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" font-size="12" fill="%23999" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3ENo Preview%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  min="0"
                />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active (visible on website)</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setIsModalOpen(false)
                setEditingImage(null)
                setFormData({
                  title: '',
                  description: '',
                  imageUrl: '',
                  category: 'general',
                  tags: [],
                  order: images.length + 1,
                  isActive: true
                })
                setUploading(false)
              }}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={uploading}>
                <Save className="w-4 h-4 mr-2" />
                {editingImage ? 'Update' : 'Create'} Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-card rounded-lg p-6 shadow-xl">
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