'use client'

import { useState, useEffect } from 'react'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X, Award,
  Users, CheckCircle, Home
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

const INITIAL_FORM_DATA = {
  title: 'Welcome To',
  subtitle: 'MARHABA FURNITURE',
  description: 'Your trusted partner for seamless furniture moving and packing services.',
  ceoName: 'Amjadullah',
  ceoPosition: 'Chief Executive Officer',
  ceoMessage: 'We are committed to providing exceptional moving services that exceed your expectations.',
  buttonText: 'Learn More',
  buttonUrl: '/about',
  features: [
    {
      title: 'Professional Service',
      description: 'Experienced team with years of expertise in furniture moving and packing.',
      icon: 'CheckCircle'
    },
    {
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed with comprehensive insurance coverage.',
      icon: 'Award'
    },
    {
      title: 'Customer First',
      description: 'Dedicated customer support and personalized service for every client.',
      icon: 'Users'
    }
  ],
  stats: [
    { label: 'Happy Customers', value: '500+' },
    { label: 'Years Experience', value: '10+' }
  ],
  isActive: true
}

const ICON_OPTIONS = [
  { value: 'CheckCircle', label: 'Check Circle', icon: CheckCircle },
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'Users', label: 'Users', icon: Users },
]

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

export default function WelcomeSectionPage() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewingSection, setViewingSection] = useState(null)
  const [editingSection, setEditingSection] = useState(null)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')

  // Fetch sections
  const fetchSections = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/welcome-section')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Welcome section API response:', data)

      if (data.success) {
        // Handle both single object and array
        if (data.data) {
          const sectionData = Array.isArray(data.data) ? data.data : [data.data]
          setSections(sectionData.filter(Boolean)) // Filter out null values
        } else {
          // No sections found
          setSections([])
          console.log('No welcome sections found in database')
        }
      } else {
        console.error('API returned success: false', data.message)
        alert(`Error: ${data.message || 'Failed to fetch welcome sections'}`)
      }
    } catch (error) {
      console.error('Error fetching sections:', error)
      alert(`Failed to fetch welcome sections: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSections()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { title: '', description: '', icon: 'CheckCircle' }]
    }))
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats]
    newStats[index] = {
      ...newStats[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      stats: newStats
    }))
  }

  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [...prev.stats, { label: '', value: '' }]
    }))
  }

  const removeStat = (index) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }))
  }

  const handleOpenDialog = (section = null) => {
    if (section) {
      setEditingSection(section)
      setFormData(section)
    } else {
      setEditingSection(null)
      setFormData(INITIAL_FORM_DATA)
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingSection(null)
    setFormData(INITIAL_FORM_DATA)
  }

  const handleViewSection = (section) => {
    setViewingSection(section)
    setViewDialogOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    setProcessingMessage(editingSection ? 'Updating welcome section...' : 'Creating welcome section...')

    try {
      const url = editingSection
        ? `/api/welcome-section/${editingSection.id}`
        : '/api/welcome-section'

      const method = editingSection ? 'PUT' : 'POST'

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
        fetchSections()
      }
    } catch (error) {
      console.error('Error saving section:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleToggleActive = async (section) => {
    setProcessing(true)
    setProcessingMessage('Updating status...')
    try {
      const response = await fetch(`/api/welcome-section/${section.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !section.isActive }),
      })

      const data = await response.json()
      if (data.success) {
        fetchSections()
      }
    } catch (error) {
      console.error('Error toggling active state:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }

  const handleDelete = async (sectionId) => {
    if (!confirm('Are you sure you want to delete this welcome section?')) return

    setProcessing(true)
    setProcessingMessage('Deleting welcome section...')
    try {
      const response = await fetch(`/api/welcome-section/${sectionId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        fetchSections()
      }
    } catch (error) {
      console.error('Error deleting section:', error)
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
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
        <h1 className="text-3xl font-bold text-foreground">Welcome Section</h1>
        <p className="text-muted-foreground mt-2">Manage the welcome section content that appears on your homepage</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Sections" value={sections.length} />
        <StatCard
          title="Active Section"
          value={sections.filter(s => s.isActive).length}
          className="text-primary"
        />
        <StatCard
          title="Inactive Sections"
          value={sections.filter(s => !s.isActive).length}
          className="text-muted-foreground"
        />
      </div>

      {/* Sections Table */}
      <div className="bg-card rounded-lg shadow border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Welcome Sections</h2>
            <Button
              onClick={() => handleOpenDialog()}
              disabled={processing}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Welcome Section
            </Button>
          </div>
        </div>

        {sections.length === 0 ? (
          <div className="p-12 text-center">
            <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No welcome sections found</p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Welcome Section
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Title & Subtitle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    CEO Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Stats
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
                {sections.map((section) => (
                  <tr
                    key={section.id}
                    className="hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleViewSection(section)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {section.title} {section.subtitle}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {section.description?.substring(0, 50)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-foreground">{section.ceoName}</p>
                        <p className="text-xs text-muted-foreground">{section.ceoPosition}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {section.features?.slice(0, 2).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            {feature.title}
                          </span>
                        ))}
                        {section.features?.length > 2 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            +{section.features.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {section.stats?.map((stat, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            {stat.value}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {section.isActive ? (
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
                            handleToggleActive(section)
                          }}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          title={section.isActive ? "Deactivate" : "Activate"}
                          disabled={processing}
                        >
                          {section.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenDialog(section)
                          }}
                          className="p-1 text-primary hover:text-primary/80 transition-colors"
                          title="Edit"
                          disabled={processing}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(section.id)
                          }}
                          className="p-1 text-destructive hover:text-destructive/80 transition-colors"
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
        <DialogContent className="max-w-[90%] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? 'Edit Welcome Section' : 'Add New Welcome Section'}
            </DialogTitle>
            <DialogDescription>
              Configure the content for your welcome section
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle *</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ceoName">CEO Name *</Label>
                <Input
                  id="ceoName"
                  name="ceoName"
                  value={formData.ceoName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ceoPosition">CEO Position</Label>
                <Input
                  id="ceoPosition"
                  name="ceoPosition"
                  value={formData.ceoPosition}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ceoMessage">CEO Message *</Label>
              <Textarea
                id="ceoMessage"
                name="ceoMessage"
                value={formData.ceoMessage}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL</Label>
                <Input
                  id="buttonUrl"
                  name="buttonUrl"
                  value={formData.buttonUrl}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Features</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        placeholder="Feature title"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        required
                      />
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={feature.icon}
                        onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                      >
                        {ICON_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Feature description"
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      rows={2}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Statistics</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addStat}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Stat
                </Button>
              </div>
              <div className="space-y-3">
                {formData.stats.map((stat, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      placeholder="Label (e.g., Happy Customers)"
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Value (e.g., 500+)"
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeStat(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Set as active welcome section</Label>
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
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {editingSection ? 'Update' : 'Create'} Welcome Section
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[90%] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Welcome Section Details</DialogTitle>
            <DialogDescription>
              Complete information about this welcome section
            </DialogDescription>
          </DialogHeader>

          {viewingSection && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Title</p>
                    <p className="font-medium">{viewingSection.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Subtitle</p>
                    <p className="font-medium">{viewingSection.subtitle}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-foreground">{viewingSection.description}</p>
                </div>
              </div>

              {/* CEO Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">CEO Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">CEO Name</p>
                    <p className="font-medium">{viewingSection.ceoName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Position</p>
                    <p className="font-medium">{viewingSection.ceoPosition}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">CEO Message</p>
                  <p className="text-foreground italic">"{viewingSection.ceoMessage}"</p>
                </div>
              </div>

              {/* Button Configuration */}
              {(viewingSection.buttonText || viewingSection.buttonUrl) && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Button Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Button Text</p>
                      <p className="font-medium">{viewingSection.buttonText || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Button URL</p>
                      <p className="font-medium text-primary">{viewingSection.buttonUrl || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {viewingSection.features && viewingSection.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Features</h3>
                  <div className="space-y-3">
                    {viewingSection.features.map((feature, index) => {
                      const IconComponent = ICON_OPTIONS.find(opt => opt.value === feature.icon)?.icon || CheckCircle
                      return (
                        <div key={index} className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                            <span className="text-xs text-muted-foreground mt-1">Icon: {feature.icon}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Statistics */}
              {viewingSection.stats && viewingSection.stats.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {viewingSection.stats.map((stat, index) => (
                      <div key={index} className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status & Metadata */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">Status & Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    {viewingSection.isActive ? (
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
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Created At</p>
                    <p className="font-medium">{new Date(viewingSection.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {viewingSection.updatedAt && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                    <p className="font-medium">{new Date(viewingSection.updatedAt).toLocaleDateString()}</p>
                  </div>
                )}
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
                    handleOpenDialog(viewingSection)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Section
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

   
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