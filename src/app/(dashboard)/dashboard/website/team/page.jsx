'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, X, Mail, Phone,
  Linkedin, Twitter, User, Image as ImageIcon
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
  order: 0,
  isActive: true
}

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

const TeamMemberRow = ({ member, onToggleActive, onEdit, onDelete }) => {
  const departmentLabel = useMemo(() => {
    const dept = DEPARTMENTS.find(d => d.value === member.department)
    return dept?.label || member.department
  }, [member.department])

  return (
    <tr className="hover:bg-muted/50">
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
              className="text-primary hover:text-primary/80"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.socialLinks?.twitter && (
            <a
              href={member.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <Twitter className="w-4 h-4" />
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
            onClick={() => onToggleActive(member)}
            className="p-1 text-muted-foreground hover:text-foreground"
            title={member.isActive ? "Deactivate" : "Activate"}
          >
            {member.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(member)}
            className="p-1 text-primary hover:text-primary/80"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="p-1 text-destructive hover:text-destructive/90"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

const TeamMemberForm = ({ formData, setFormData, members, isImagePickerOpen, setIsImagePickerOpen }) => {
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
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter member name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position *</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              placeholder="Enter position"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
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
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+971 XX XXX XXXX"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Brief description about the team member..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Profile Image</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
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
                className="w-32 h-32 object-cover rounded border"
                onError={(e) => {
                  console.error('Preview image failed to load:', formData.imageUrl)
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect width="128" height="128" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" font-size="12" fill="%23999" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3ENo Preview%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter URL</Label>
            <Input
              id="twitter"
              value={formData.twitter}
              onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          />
          <Label htmlFor="isActive">Active (visible on website)</Label>
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

export default function TeamPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [processingMessage, setProcessingMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [error, setError] = useState(null)

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

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
        setError(result.message || 'Failed to fetch team members')
        console.error('Failed to fetch team members:', result.message)
      }
    } catch (error) {
      setError('Network error: Failed to fetch team members')
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, departmentFilter, statusFilter])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const handleAdd = useCallback(() => {
    setEditingMember(null)
    setFormData({
      ...INITIAL_FORM_DATA,
      order: members.length + 1
    })
    setIsModalOpen(true)
  }, [members.length])

  const handleEdit = useCallback((member) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      email: member.email || '',
      phone: member.phone || '',
      imageUrl: member.imageUrl || '',
      bio: member.bio || '',
      linkedin: member.socialLinks?.linkedin || '',
      twitter: member.socialLinks?.twitter || '',
      order: member.order,
      isActive: member.isActive
    })
    setIsModalOpen(true)
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      setProcessing(true)
      setProcessingMessage(editingMember ? 'Updating team member...' : 'Creating team member...')

      const url = editingMember
        ? `/api/team/${editingMember.id}`
        : '/api/team'

      const method = editingMember ? 'PUT' : 'POST'

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
        setEditingMember(null)
        setFormData(INITIAL_FORM_DATA)
        await fetchMembers()
      } else {
        const errorMessage = result.errors
          ? result.errors.join(', ')
          : result.message || 'Failed to save team member'
        console.error('Failed to save team member:', errorMessage)
        alert(errorMessage)
      }
    } catch (error) {
      console.error('Error saving team member:', error)
      alert('Network error: Failed to save team member')
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }, [editingMember, formData, fetchMembers])

  const handleDelete = useCallback(async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return
    }

    try {
      setProcessing(true)
      setProcessingMessage('Deleting team member...')

      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        await fetchMembers()
      } else {
        console.error('Failed to delete team member:', result.message)
        alert(result.message || 'Failed to delete team member')
      }
    } catch (error) {
      console.error('Error deleting team member:', error)
      alert('Network error: Failed to delete team member')
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }, [fetchMembers])

  const handleToggleActive = useCallback(async (member) => {
    try {
      setProcessing(true)
      setProcessingMessage('Updating status...')

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
      } else {
        console.error('Failed to toggle member status:', result.message)
        alert(result.message || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error toggling member status:', error)
      alert('Network error: Failed to update status')
    } finally {
      setProcessing(false)
      setProcessingMessage('')
    }
  }, [fetchMembers])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setEditingMember(null)
    setFormData(INITIAL_FORM_DATA)
  }, [])

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

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading team members...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
        <p className="text-muted-foreground mt-2">Manage your company team members</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
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
                <td colSpan="8" className="px-6 py-8 text-center text-muted-foreground">
                  {members.length === 0
                    ? "No team members found. Add your first team member!"
                    : "No members match your search criteria."}
                </td>
              </tr>
            ) : (
              sortedMembers.map(member => (
                <TeamMemberRow
                  key={member.id}
                  member={member}
                  onToggleActive={handleToggleActive}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
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

          <TeamMemberForm
            formData={formData}
            setFormData={setFormData}
            members={members}
            isImagePickerOpen={isImagePickerOpen}
            setIsImagePickerOpen={setIsImagePickerOpen}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCloseModal}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={processing}
            >
              <Save className="w-4 h-4 mr-2" />
              {editingMember ? 'Update' : 'Add'} Member
            </Button>
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