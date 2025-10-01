'use client'

import { useState, useEffect } from 'react'
import { Search, Check, X, Plus, Upload, Save } from 'lucide-react'
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

export function ImagePicker({ isOpen, onClose, onSelect, selectedImageUrl = null }) {
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Upload form state - same as your Gallery component
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'general',
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
        const activeImages = result.data.filter(img => img.isActive)
        setImages(activeImages)
        setFilteredImages(activeImages)
      } else {
        console.error('Failed to fetch images:', result.message)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load images when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchImages()
      // Pre-select the current image if provided
      if (selectedImageUrl) {
        const preSelected = images.find(img => img.imageUrl === selectedImageUrl)
        setSelectedImage(preSelected || { imageUrl: selectedImageUrl })
      }
    }
  }, [isOpen, selectedImageUrl])

  // Filter images based on search term and category
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

    setFilteredImages(filtered)
  }, [images, searchTerm, categoryFilter])

  const handleSelect = () => {
    if (selectedImage) {
      onSelect(selectedImage.imageUrl)
      onClose()
    }
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  // Handle file upload - same as your Gallery component
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      setUploading(true)
      const uploadFormDataObj = new FormData()
      uploadFormDataObj.append('file', file)
      uploadFormDataObj.append('category', uploadFormData.category)
      uploadFormDataObj.append('title', uploadFormData.title || file.name)
      uploadFormDataObj.append('description', uploadFormData.description)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormDataObj
      })

      const result = await response.json()

      if (result.success) {
        // Update form with uploaded image URL
        setUploadFormData({
          ...uploadFormData,
          imageUrl: result.data.url,
          title: uploadFormData.title || result.data.title
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

  // Handle upload form submission
  const handleUploadSubmit = async () => {
    try {
      setUploading(true)

      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadFormData)
      })

      const result = await response.json()

      if (result.success) {
        // Add the new image to the images list
        const updatedImages = [...images, result.data]
        setImages(updatedImages)
        setFilteredImages(updatedImages)
        
        // Select the newly uploaded image
        setSelectedImage(result.data)
        
        // Close the upload modal and reset form
        setIsUploadModalOpen(false)
        setUploadFormData({
          title: '',
          description: '',
          imageUrl: '',
          category: 'general',
          order: 0,
          isActive: true
        })
        
        // Refresh to ensure we have the latest data
        await fetchImages()
      } else {
        alert('Failed to save image: ' + result.message)
      }
    } catch (error) {
      console.error('Error saving image:', error)
      alert('Error saving image')
    } finally {
      setUploading(false)
    }
  }

  const handleOpenUploadModal = () => {
    setUploadFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: 'general',
      order: 0,
      isActive: true
    })
    setIsUploadModalOpen(true)
  }

  const categories = [...new Set(images.map(img => img.category))]

  return (
    <>
      {/* Main ImagePicker Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
            <DialogDescription>
              Choose an image from your gallery or upload a new one
            </DialogDescription>
          </DialogHeader>

          {/* Search and Upload Button */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search images..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
            </div>
            
            <Button 
              onClick={handleOpenUploadModal}
              variant="outline"
              className="ml-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload New Image
            </Button>
          </div>

          {/* Images Grid */}
          <div className="flex-1 overflow-y-auto max-h-80">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">Loading images...</div>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <p>No images found</p>
                <p className="text-sm">Click "Upload New Image" to add your first image</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage?.id === image.id
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={image.imageUrl}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Selection indicator */}
                    {selectedImage?.id === image.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}

                    {/* Image info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
                      <p className="text-xs font-medium truncate">{image.title}</p>
                      <p className="text-xs text-gray-300 truncate">{image.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Image Preview */}
          <div className='flex items-end justify-between'>
            <div className="flex-1">
              {selectedImage && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedImage.imageUrl}
                      alt={selectedImage.title}
                      className="w-16 h-16 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{selectedImage.title}</h3>
                      <p className="text-sm text-gray-600">{selectedImage.description || 'No description'}</p>
                      <p className="text-xs text-gray-500">Category: {selectedImage.category}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 ml-4">
              <Button variant="outline" onClick={onClose}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSelect}
                disabled={!selectedImage}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Check className="w-4 h-4 mr-2" />
                Select Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Modal - Exact same as your Gallery modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload New Image</DialogTitle>
            <DialogDescription>
              Upload a new image to the gallery
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={uploadFormData.title}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, title: e.target.value })}
                  placeholder="Enter image title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={uploadFormData.category} onValueChange={(value) => setUploadFormData({ ...uploadFormData, category: value })}>
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
                value={uploadFormData.description}
                onChange={(e) => setUploadFormData({ ...uploadFormData, description: e.target.value })}
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
                  value={uploadFormData.imageUrl}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, imageUrl: e.target.value })}
                  className="flex-1"
                />
              </div>
              {uploading && (
                <p className="text-sm text-primary">Uploading image...</p>
              )}
              {uploadFormData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={uploadFormData.imageUrl}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded border"
                    onError={(e) => {
                      console.error('Preview image failed to load:', uploadFormData.imageUrl)
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
                  value={uploadFormData.order}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, order: parseInt(e.target.value) })}
                  min="0"
                />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id="isActive"
                  checked={uploadFormData.isActive}
                  onCheckedChange={(checked) => setUploadFormData({ ...uploadFormData, isActive: checked })}
                />
                <Label htmlFor="isActive">Active (visible on website)</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                setIsUploadModalOpen(false)
                setUploadFormData({
                  title: '',
                  description: '',
                  imageUrl: '',
                  category: 'general',
                  order: 0,
                  isActive: true
                })
                setUploading(false)
              }}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleUploadSubmit} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground" 
                disabled={uploading || !uploadFormData.imageUrl}
              >
                <Save className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}