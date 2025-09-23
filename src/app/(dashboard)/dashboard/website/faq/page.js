'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X,
  ArrowUp, ArrowDown, HelpCircle, ChevronDown, ChevronUp
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
  question: '',
  answer: '',
  category: '',
  order: 0,
  isActive: true
}

const CATEGORIES = [
  'General',
  'Services',
  'Pricing',
  'Booking',
  'Moving Process',
  'Insurance',
  'Payment',
  'Safety',
  'Areas',
  'Other'
]

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

const FAQRow = ({ faq, index, totalFaqs, onToggleActive, onEdit, onDelete, onOrderChange, processing }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <tr className="hover:bg-muted/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-muted-foreground">{faq.order}</span>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-foreground">{faq.question}</p>
          {isExpanded && (
            <p className="text-sm text-muted-foreground mt-2">{faq.answer}</p>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {faq.category && (
          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
            {faq.category}
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {faq.isActive ? (
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
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-muted-foreground hover:text-foreground"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onOrderChange(faq, 'up')}
            disabled={index === 0 || processing}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
            title="Move up"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOrderChange(faq, 'down')}
            disabled={index === totalFaqs - 1 || processing}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
            title="Move down"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleActive(faq)}
            className="p-1 text-muted-foreground hover:text-foreground"
            title={faq.isActive ? "Deactivate" : "Activate"}
          >
            {faq.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(faq)}
            className="p-1 text-primary hover:text-primary/80"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(faq.id)}
            className="p-1 text-destructive hover:text-destructive/80"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

const FAQForm = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        <Label htmlFor="question">Question *</Label>
        <Input
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Enter the frequently asked question"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer">Answer *</Label>
        <Textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          placeholder="Enter the detailed answer"
          rows={4}
        />
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

export default function FAQPage() {
  const [faqs, setFaqs] = useState([])
  const [filteredFaqs, setFilteredFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  // Statistics
  const stats = useMemo(() => ({
    total: faqs.length,
    active: faqs.filter(f => f.isActive).length,
    inactive: faqs.filter(f => !f.isActive).length,
    categories: [...new Set(faqs.map(f => f.category).filter(Boolean))].length
  }), [faqs])

  // Fetch FAQs from API
  const fetchFaqs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/faq')
      const result = await response.json()

      if (result.success) {
        setFaqs(result.data)
        setFilteredFaqs(result.data)
      } else {
        console.error('Failed to fetch FAQs:', result.message)
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load FAQs on component mount
  useEffect(() => {
    fetchFaqs()
  }, [])

  // Filter FAQs based on search term, status, and category
  useEffect(() => {
    let filtered = faqs

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(faq =>
        statusFilter === 'active' ? faq.isActive : !faq.isActive
      )
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(faq => faq.category === categoryFilter)
    }

    setFilteredFaqs(filtered)
  }, [faqs, searchTerm, statusFilter, categoryFilter])

  const handleAdd = () => {
    setEditingFaq(null)
    setFormData({
      ...INITIAL_FORM_DATA,
      order: faqs.length + 1
    })
    setIsModalOpen(true)
  }

  const handleEdit = (faq) => {
    setEditingFaq(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      order: faq.order,
      isActive: faq.isActive
    })
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setProcessing(true)
      setProcessingMessage(editingFaq ? 'Updating FAQ...' : 'Creating FAQ...')

      const url = editingFaq
        ? `/api/faq/${editingFaq.id}`
        : '/api/faq'

      const method = editingFaq ? 'PUT' : 'POST'

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
        setEditingFaq(null)
        setFormData(INITIAL_FORM_DATA)
        await fetchFaqs()
      } else {
        console.error('Failed to save FAQ:', result.message)
      }
    } catch (error) {
      console.error('Error saving FAQ:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      setProcessing(true)
      setProcessingMessage('Deleting FAQ...')

      const response = await fetch(`/api/faq/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        await fetchFaqs()
      } else {
        console.error('Failed to delete FAQ:', result.message)
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleToggleStatus = async (faq) => {
    try {
      setProcessing(true)
      setProcessingMessage('Updating status...')

      const response = await fetch(`/api/faq/${faq.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...faq,
          isActive: !faq.isActive
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchFaqs()
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

  const handleOrderChange = async (faq, direction) => {
    const currentIndex = faqs.findIndex(f => f.id === faq.id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (newIndex < 0 || newIndex >= faqs.length) return

    const otherFaq = faqs[newIndex]

    try {
      setProcessing(true)
      setProcessingMessage('Updating order...')

      // Swap orders
      await Promise.all([
        fetch(`/api/faq/${faq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...faq,
            order: otherFaq.order
          })
        }),
        fetch(`/api/faq/${otherFaq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...otherFaq,
            order: faq.order
          })
        })
      ])

      await fetchFaqs()
    } catch (error) {
      console.error('Error changing order:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingFaq(null)
    setFormData(INITIAL_FORM_DATA)
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">FAQ</h1>
        <p className="text-muted-foreground mt-2">Manage frequently asked questions</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total FAQs" value={stats.total} />
        <StatCard title="Active" value={stats.active} className="text-primary" />
        <StatCard title="Inactive" value={stats.inactive} className="text-muted-foreground" />
        <StatCard title="Categories" value={stats.categories} className="text-primary" />
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg shadow p-4 border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All FAQs</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="inactive">Inactive Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* FAQs Table */}
      <div className="bg-card rounded-lg shadow border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">FAQ Management</h2>
            <Button
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="text-muted-foreground">Loading FAQs...</div>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="p-12 text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No FAQs found</p>
            <p className="text-muted-foreground mt-2">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Click "Add FAQ" to create your first FAQ'}
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
                    Question & Answer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
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
                {filteredFaqs.map((faq, index) => (
                  <FAQRow
                    key={faq.id}
                    faq={faq}
                    index={index}
                    totalFaqs={filteredFaqs.length}
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
            <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
            <DialogDescription>
              {editingFaq ? 'Update the FAQ details' : 'Create a new frequently asked question'}
            </DialogDescription>
          </DialogHeader>

          <FAQForm
            formData={formData}
            setFormData={setFormData}
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={processing || !formData.question || !formData.answer}
            >
              <Save className="w-4 h-4 mr-2" />
              {editingFaq ? 'Update FAQ' : 'Create FAQ'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}