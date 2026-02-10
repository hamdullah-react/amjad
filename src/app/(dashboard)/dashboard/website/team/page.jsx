'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X, Mail, Phone,
  Linkedin, Twitter, User, Image as ImageIcon, Facebook, Instagram, MessageCircle, CheckCircle, XCircle, Loader2, AlertCircle
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

const DEPARTMENTS = [
  { value: 'management', label: 'Management' },
  { value: 'operations', label: 'Operations' },
  { value: 'sales', label: 'Sales' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'finance', label: 'Finance' },
  { value: 'hr', label: 'Human Resources' }
]

const INITIAL_FORM_DATA = {
  name: '',
  position: '',
  department: 'operations',
  email: '',
  phone: '',
  imageUrl: '',
  bio: '',
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: '',
  tiktok: '',
  order: 0,
  isActive: true
}

export default function TeamPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const showFeedback = (type, message) => {
    setFeedback({ type, message })
    setTimeout(() => setFeedback(null), 4000)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  // Remove the separate formData state and useEffect that was causing the loop
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, getValues } = useForm({
    defaultValues: INITIAL_FORM_DATA
  })

  const watchedValues = watch()

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)

      const params = new URLSearchParams({
        search: searchTerm,
        department: departmentFilter,
        status: statusFilter
      })

      const response = await fetch(`/api/team?${params}`)
      const result = await response.json()

      if (result.success) {
        setMembers(result.data)
      } else {
        console.error('Failed to fetch team members:', result.message)
        showFeedback('error', result.message || 'Failed to fetch team members')
      }
    } catch (error) {
      console.error('Error fetching team members:', error)
      showFeedback('error', 'Network error: Failed to fetch team members')
    } finally {
      setLoading(false)
    }
  }, [searchTerm, departmentFilter, statusFilter])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const handleAdd = useCallback(() => {
    setEditingMember(null)
    reset({
      ...INITIAL_FORM_DATA,
      order: members.length + 1
    })
    setIsModalOpen(true)
  }, [members.length, reset])

  const handleEdit = useCallback((member) => {
    setEditingMember(member)
    reset({
      name: member.name,
      position: member.position,
      department: member.department,
      email: member.email || '',
      phone: member.phone || '',
      imageUrl: member.imageUrl || '',
      bio: member.bio || '',
      linkedin: member.socialLinks?.linkedin || '',
      twitter: member.socialLinks?.twitter || '',
      facebook: member.socialLinks?.facebook || '',
      instagram: member.socialLinks?.instagram || '',
      tiktok: member.socialLinks?.tiktok || '',
      order: member.order,
      isActive: member.isActive
    })
    setIsModalOpen(true)
  }, [reset])

  const handleFormSubmit = useCallback(async (data) => {
    try {
      setProcessing(true)

      const url = editingMember
        ? `/api/team/${editingMember.id}`
        : '/api/team'

      const method = editingMember ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          socialLinks: {
            linkedin: data.linkedin,
            twitter: data.twitter,
            facebook: data.facebook,
            instagram: data.instagram,
            tiktok: data.tiktok
          }
        })
      })

      const result = await response.json()

      if (result.success) {
        setIsModalOpen(false)
        setEditingMember(null)
        reset(INITIAL_FORM_DATA)
        await fetchMembers()
        showFeedback('success', editingMember ? 'Team member updated successfully!' : 'Team member created successfully!')
      } else {
        const errorMessage = result.errors
          ? result.errors.join(', ')
          : result.message || 'Failed to save team member'
        console.error('Failed to save team member:', errorMessage)
        showFeedback('error', errorMessage)
      }
    } catch (error) {
      console.error('Error saving team member:', error)
      showFeedback('error', 'Network error: Failed to save team member')
    } finally {
      setProcessing(false)
    }
  }, [editingMember, fetchMembers, reset])

  const handleDelete = useCallback(async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return
    }

    try {
      setProcessing(true)

      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        await fetchMembers()
        showFeedback('success', 'Team member deleted successfully!')
      } else {
        console.error('Failed to delete team member:', result.message)
        showFeedback('error', result.message || 'Failed to delete team member')
      }
    } catch (error) {
      console.error('Error deleting team member:', error)
      showFeedback('error', 'Network error: Failed to delete team member')
    } finally {
      setProcessing(false)
    }
  }, [fetchMembers])

  const handleToggleActive = useCallback(async (member) => {
    try {
      setProcessing(true)

      const response = await fetch(`/api/team/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...member,
          isActive: !member.isActive
        })
      })

      const result = await response.json()

      if (result.success) {
        await fetchMembers()
        showFeedback('success', `Member ${!member.isActive ? 'activated' : 'deactivated'} successfully!`)
      } else {
        console.error('Failed to toggle member status:', result.message)
        showFeedback('error', result.message || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error toggling member status:', error)
      showFeedback('error', 'Network error: Failed to update status')
    } finally {
      setProcessing(false)
    }
  }, [fetchMembers])

  const handleImageSelect = useCallback((imageUrl) => {
    setValue('imageUrl', imageUrl)
    setIsImagePickerOpen(false)
  }, [setValue])

  const statistics = useMemo(() => ({
    total: members.length,
    active: members.filter(m => m.isActive).length,
    inactive: members.filter(m => !m.isActive).length,
    departments: [...new Set(members.map(m => m.department))].length
  }), [members])

  const sortedMembers = useMemo(() =>
    [...members].sort((a, b) => a.order - b.order),
    [members]
  )

  const StatCard = ({ title, value, className = '' }) => (
    <div className="bg-card rounded-lg shadow p-4 border">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className={`text-2xl font-bold ${className}`}>{value}</div>
    </div>
  )

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading team members...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
        <p className="text-muted-foreground mt-2">Manage your company team members</p>
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Members" value={statistics.total} className="text-foreground" />
        <StatCard title="Active Members" value={statistics.active} className="text-primary" />
        <StatCard title="Departments" value={statistics.departments} className="text-primary" />
        <StatCard title="Inactive" value={statistics.inactive} className="text-muted-foreground" />
      </div>

      {/* Team Members Table */}
      <div className="bg-card rounded-lg shadow border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">Team Members</h2>
            <Button
              onClick={handleAdd}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Photo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name & Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Social
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedMembers.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                      <AlertCircle className="w-10 h-10 mb-3" />
                      <p className="text-lg font-medium">No members found</p>
                      <p className="text-sm">{members.length === 0 ? "Add your first team member to get started." : "No members match your search criteria."}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedMembers.map(member => {
                  const departmentLabel = DEPARTMENTS.find(d => d.value === member.department)?.label || member.department
                  
                  return (
                    <tr key={member.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-muted-foreground">{member.order}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
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
                          <p className="text-sm font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.position}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-muted-foreground">{departmentLabel}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs space-y-1">
                          {member.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{member.email}</span>
                            </div>
                          )}
                          {member.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{member.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {member.socialLinks?.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                          {member.socialLinks?.twitter && (
                            <a
                              href={member.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-500"
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          )}
                          {member.socialLinks?.facebook && (
                            <a
                              href={member.socialLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Facebook className="w-4 h-4" />
                            </a>
                          )}
                          {member.socialLinks?.instagram && (
                            <a
                              href={member.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:text-pink-700"
                            >
                              <Instagram className="w-4 h-4" />
                            </a>
                          )}
                          {member.socialLinks?.tiktok && (
                            <a
                              href={member.socialLinks.tiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black hover:text-gray-700"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {member.isActive ? (
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
                            onClick={() => handleToggleActive(member)}
                            className="p-1 text-muted-foreground hover:text-foreground"
                            title={member.isActive ? "Deactivate" : "Activate"}
                          >
                            {member.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-1 text-primary hover:text-primary/80"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="p-1 text-destructive hover:text-destructive/90"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[90%] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
            </DialogTitle>
            <DialogDescription>
              {editingMember ? 'Update team member details' : 'Add a new member to your team'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Enter member name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  {...register('position', { required: 'Position is required' })}
                  placeholder="Enter position"
                />
                {errors.position && (
                  <p className="text-sm text-destructive">{errors.position.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={watchedValues.department}
                  onValueChange={(value) => setValue('department', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map(dept => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
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
                  {...register('order', { 
                    valueAsNumber: true,
                    min: { value: 0, message: 'Order must be 0 or greater' }
                  })}
                  min="0"
                />
                {errors.order && (
                  <p className="text-sm text-destructive">{errors.order.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register('bio')}
                placeholder="Brief description about the team member..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Image</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter image URL"
                  {...register('imageUrl')}
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
              {watchedValues.imageUrl && (
                <div className="mt-2">
                  <img
                    src={watchedValues.imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                    onError={(e) => {
                      console.error('Preview image failed to load:', watchedValues.imageUrl)
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect width="128" height="128" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" font-size="12" fill="%23999" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3ENo Preview%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Social Media Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Social Media Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn URL
                  </Label>
                  <Input
                    id="linkedin"
                    {...register('linkedin')}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    Twitter URL
                  </Label>
                  <Input
                    id="twitter"
                    {...register('twitter')}
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook URL
                  </Label>
                  <Input
                    id="facebook"
                    {...register('facebook')}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    Instagram URL
                  </Label>
                  <Input
                    id="instagram"
                    {...register('instagram')}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tiktok" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-black" />
                    TikTok URL
                  </Label>
                  <Input
                    id="tiktok"
                    {...register('tiktok')}
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={watchedValues.isActive}
                onCheckedChange={(checked) => setValue('isActive', checked)}
              />
              <Label htmlFor="isActive">Active (visible on website)</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={processing}
              >
                <Save className="w-4 h-4 mr-2" />
                {editingMember ? 'Update' : 'Add'} Member
              </Button>
            </div>
          </form>

          <ImagePicker
            isOpen={isImagePickerOpen}
            onClose={() => setIsImagePickerOpen(false)}
            onSelect={handleImageSelect}
            selectedImageUrl={watchedValues.imageUrl}
          />
        </DialogContent>
      </Dialog>

    </div>
  )
}