'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X,
  ArrowUp, ArrowDown, Award, Shield, Clock,
  Users, Truck, CheckCircle
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

const INITIAL_FORM_DATA = {
  title: '',
  description: '',
  icon: '',
  color: 'blue',
  order: 0,
  isActive: true
}

const COLORS = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
  { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
  { value: 'gray', label: 'Gray', class: 'bg-gray-500' }
]

const ICON_SUGGESTIONS = [
  { value: 'award', label: 'Award', icon: Award },
  { value: 'shield', label: 'Shield', icon: Shield },
  { value: 'clock', label: 'Clock', icon: Clock },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'truck', label: 'Truck', icon: Truck },
  { value: 'check-circle', label: 'Check Circle', icon: CheckCircle }
]

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="text-sm text-gray-600">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

const WhyChooseUsRow = ({ item, index, totalItems, onToggleActive, onEdit, onDelete, onOrderChange, processing }) => {
  const IconComponent = ICON_SUGGESTIONS.find(i => i.value === item.icon)?.icon || Award
  const colorClass = COLORS.find(c => c.value === item.color)?.class || 'bg-blue-500'

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{item.order}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-900">{item.title}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-600 max-w-xs truncate">{item.description}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-full ${colorClass} text-white`}>
          {item.color}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.isActive ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Eye className="w-3 h-3" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <EyeOff className="w-3 h-3" />
            Inactive
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOrderChange(item, 'up')}
            disabled={index === 0 || processing}
            className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            title="Move up"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOrderChange(item, 'down')}
            disabled={index === totalItems - 1 || processing}
            className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            title="Move down"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleActive(item)}
            className="p-1 text-gray-600 hover:text-gray-800"
            title={item.isActive ? "Deactivate" : "Activate"}
          >
            {item.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(item)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
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

const WhyChooseUsForm = ({ formData, setFormData }) => {
  const SelectedIcon = ICON_SUGGESTIONS.find(i => i.value === formData.icon)?.icon || Award
  const selectedColor = COLORS.find(c => c.value === formData.color)?.class || 'bg-blue-500'

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter title"
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
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              {ICON_SUGGESTIONS.map(({ value, label, icon: Icon }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="Or enter custom icon name"
            className="mt-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COLORS.map(({ value, label, class: colorClass }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${colorClass}`}></div>
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preview</Label>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-lg ${selectedColor} flex items-center justify-center flex-shrink-0`}>
              <SelectedIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">{formData.title || 'Title Preview'}</h4>
              <p className="text-gray-600 mt-1">{formData.description || 'Description preview will appear here'}</p>
            </div>
          </div>
        </div>
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
  )
}

export default function WhyChooseUsPage() {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  // Statistics
  const stats = useMemo(() => ({
    total: items.length,
    active: items.filter(i => i.isActive).length,
    inactive: items.filter(i => !i.isActive).length,
    colors: [...new Set(items.map(i => i.color))].length
  }), [items])

  // Fetch items from API
  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/why-choose-us')
      const result = await response.json()

      if (result.success) {
        setItems(result.data)
        setFilteredItems(result.data)
      } else {
        console.error('Failed to fetch items:', result.message)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load items on component mount
  useEffect(() => {
    fetchItems()
  }, [])

  // Filter items based on search term and status
  useEffect(() => {
    let filtered = items

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item =>
        statusFilter === 'active' ? item.isActive : !item.isActive
      )
    }

    setFilteredItems(filtered)
  }, [items, searchTerm, statusFilter])

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      ...INITIAL_FORM_DATA,
      order: items.length + 1
    })
    setIsModalOpen(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon || '',
      color: item.color || 'blue',
      order: item.order,
      isActive: item.isActive
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setProcessing(true)
      setProcessingMessage(editingItem ? 'Updating item...' : 'Creating item...')

      const url = editingItem
        ? `/api/why-choose-us/${editingItem.id}`
        : '/api/why-choose-us'

      const method = editingItem ? 'PUT' : 'POST'

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
        setEditingItem(null)
        setFormData(INITIAL_FORM_DATA)
        await fetchItems()
      } else {
        console.error('Failed to save item:', result.message)
      }
    } catch (error) {
      console.error('Error saving item:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      setProcessing(true)
      setProcessingMessage('Deleting item...')

      const response = await fetch(`/api/why-choose-us/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        await fetchItems()
      } else {
        console.error('Failed to delete item:', result.message)
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleToggleStatus = async (item) => {
    try {
      setProcessing(true)
      setProcessingMessage('Updating status...')

      const response = await fetch(`/api/why-choose-us/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...item,
          isActive: !item.isActive
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchItems()
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

  const handleOrderChange = async (item, direction) => {
    const currentIndex = items.findIndex(i => i.id === item.id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= items.length) return

    const otherItem = items[newIndex]

    try {
      setProcessing(true)
      setProcessingMessage('Updating order...')

      // Swap orders
      await Promise.all([
        fetch(`/api/why-choose-us/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...item,
            order: otherItem.order
          })
        }),
        fetch(`/api/why-choose-us/${otherItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...otherItem,
            order: item.order
          })
        })
      ])

      await fetchItems()
    } catch (error) {
      console.error('Error changing order:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData(INITIAL_FORM_DATA)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Why Choose Us</h1>
          <p className="text-gray-600 mt-2">Manage your unique selling points and benefits</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Items" value={stats.total} />
        <StatCard title="Active" value={stats.active} className="text-green-600" />
        <StatCard title="Inactive" value={stats.inactive} className="text-gray-600" />
        <StatCard title="Color Variants" value={stats.colors} className="text-purple-600" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search items..."
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
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="text-gray-500">Loading items...</div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No items found</p>
            <p className="text-gray-500 mt-2">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Click "Add Item" to create your first item'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item, index) => (
                  <WhyChooseUsRow
                    key={item.id}
                    item={item}
                    index={index}
                    totalItems={filteredItems.length}
                    onToggleActive={handleToggleStatus}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onOrderChange={handleOrderChange}
                    processing={processing}
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
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-lg font-medium text-gray-900">{processingMessage || 'Processing...'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the item details' : 'Create a new why choose us item'}
            </DialogDescription>
          </DialogHeader>

          <WhyChooseUsForm
            formData={formData}
            setFormData={setFormData}
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={processing || !formData.title || !formData.description}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? 'Update Item' : 'Create Item'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}