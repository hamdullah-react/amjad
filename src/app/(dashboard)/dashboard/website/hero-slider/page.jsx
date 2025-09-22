'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff, Image, Save, X, ImageIcon } from 'lucide-react'
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

export default function HeroSliderPage() {
  const [slides, setSlides] = useState([])
  const [filteredSlides, setFilteredSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    buttonText: '',
    buttonUrl: '',
    order: 0,
    isActive: true
  })

  // Fetch slides from API
  const fetchSlides = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/hero-slider')
      const result = await response.json()

      if (result.success) {
        setSlides(result.data)
        setFilteredSlides(result.data)
      } else {
        console.error('Failed to fetch slides:', result.message)
      }
    } catch (error) {
      console.error('Error fetching slides:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load slides on component mount
  useEffect(() => {
    fetchSlides()
  }, [])

  // Filter slides based on search term and status
  useEffect(() => {
    let filtered = slides

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(slide =>
        slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (slide.subtitle && slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (slide.description && slide.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (slide.buttonText && slide.buttonText.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(slide =>
        statusFilter === 'active' ? slide.isActive : !slide.isActive
      )
    }

    setFilteredSlides(filtered)
  }, [slides, searchTerm, statusFilter])

  const handleAdd = () => {
    setEditingSlide(null)
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      imageUrl: '',
      buttonText: '',
      buttonUrl: '',
      order: slides.length + 1,
      isActive: true
    })
    setIsModalOpen(true)
  }

  const handleEdit = (slide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle || '',
      description: slide.description || '',
      imageUrl: slide.imageUrl,
      buttonText: slide.buttonText || '',
      buttonUrl: slide.buttonUrl || '',
      order: slide.order,
      isActive: slide.isActive
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setProcessing(true)
      setProcessingMessage(editingSlide ? 'Updating slide...' : 'Creating slide...')

      const url = editingSlide
        ? `/api/hero-slider/${editingSlide.id}`
        : '/api/hero-slider'

      const method = editingSlide ? 'PUT' : 'POST'

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
        setEditingSlide(null)
        setFormData({
          title: '',
          subtitle: '',
          description: '',
          imageUrl: '',
          buttonText: '',
          buttonUrl: '',
          order: 0,
          isActive: true
        })
        await fetchSlides() // Refresh the list
      } else {
        console.error('Failed to save slide:', result.message)
        alert('Failed to save slide: ' + result.message)
      }
    } catch (error) {
      console.error('Error saving slide:', error)
      alert('Error saving slide')
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      try {
        setProcessing(true)
        setProcessingMessage('Deleting slide...')

        const response = await fetch(`/api/hero-slider/${id}`, {
          method: 'DELETE'
        })

        const result = await response.json()

        if (result.success) {
          await fetchSlides() // Refresh the list
        } else {
          console.error('Failed to delete slide:', result.message)
          alert('Failed to delete slide')
        }
      } catch (error) {
        console.error('Error deleting slide:', error)
        alert('Error deleting slide')
      } finally {
        setProcessing(false)
        setProcessingMessage('')
      }
    }
  }

  const handleToggleActive = async (slide) => {
    try {
      setProcessing(true)
      setProcessingMessage('Updating status...')

      const response = await fetch(`/api/hero-slider/${slide.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...slide,
          isActive: !slide.isActive
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchSlides() // Refresh the list
      } else {
        console.error('Failed to toggle slide status:', result.message)
      }
    } catch (error) {
      console.error('Error toggling slide status:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleImageSelect = (imageUrl) => {
    setFormData({ ...formData, imageUrl })
    setIsImagePickerOpen(false)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading slides...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hero Slider</h1>
        <p className="text-gray-600 mt-2">Manage your website's hero slider content</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Slides</div>
          <div className="text-2xl font-bold text-gray-900">{slides.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Active Slides</div>
          <div className="text-2xl font-bold text-green-600">
            {slides.filter(slide => slide.isActive).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Inactive Slides</div>
          <div className="text-2xl font-bold text-gray-400">
            {slides.filter(slide => !slide.isActive).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Last Updated</div>
          <div className="text-sm font-semibold text-gray-700">
            {slides.length > 0 ? new Date(slides[0].updatedAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search slides..."
            className="w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </Button>
      </div>

      {/* Slides Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preview
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtitle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Button
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSlides.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  {slides.length === 0 ? "No slides found. Create your first slide!" : "No slides match your search criteria."}
                </td>
              </tr>
            ) : (
              filteredSlides.map((slide) => (
                <tr key={slide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {slide.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      {slide.imageUrl ? (
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{slide.title}</div>
                    {slide.description && (
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {slide.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{slide.subtitle || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{slide.buttonText || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(slide)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        slide.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {slide.isActive ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slide.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSlide ? 'Edit Slide' : 'Add New Slide'}</DialogTitle>
            <DialogDescription>
              {editingSlide ? 'Update the slide details' : 'Create a new slide for your hero carousel'}
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
                  placeholder="Enter slide title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Enter slide subtitle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter slide description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Image *</Label>
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
                    <ImageIcon className="w-4 h-4 mr-2" />
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
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  placeholder="Enter button text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL</Label>
                <Input
                  id="buttonUrl"
                  value={formData.buttonUrl}
                  onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
                  placeholder="Enter button URL"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Active (visible on website)</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setIsModalOpen(false)
                setEditingSlide(null)
                setFormData({
                  title: '',
                  subtitle: '',
                  description: '',
                  imageUrl: '',
                  buttonText: '',
                  buttonUrl: '',
                  order: slides.length + 1,
                  isActive: true
                })
              }}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                {editingSlide ? 'Update' : 'Create'} Slide
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Picker Modal */}
      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={handleImageSelect}
        selectedImageUrl={formData.imageUrl}
      />

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-lg font-medium text-gray-900">{processingMessage || 'Processing...'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}