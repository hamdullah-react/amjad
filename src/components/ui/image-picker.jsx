'use client'

import { useState, useEffect } from 'react'
import { Search, Upload, Check, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ImagePicker({ isOpen, onClose, onSelect, selectedImageUrl = null }) {
  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/gallery')
      const result = await response.json()

      if (result.success) {
        setImages(result.data.filter(img => img.isActive)) // Only show active images
        setFilteredImages(result.data.filter(img => img.isActive))
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
        setSelectedImage({ imageUrl: selectedImageUrl })
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

  const categories = [...new Set(images.map(img => img.category))]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
          <DialogDescription>
            Choose an image from your gallery or upload a new one
          </DialogDescription>
        </DialogHeader>

        {/* Search and Filter */}
        <div className="flex gap-2 mb-4">
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

        {/* Images Grid */}
        <div className="flex-1 overflow-y-auto max-h-80">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">Loading images...</div>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Upload className="w-8 h-8 mb-2" />
              <p>No images found</p>
              <p className="text-sm">Upload some images to get started</p>
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
        <div className='flex  items-end justify-between'>
<div>

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
        <div className="flex justify-end gap-2 ">
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
  )
}