'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Edit, Trash2, TrendingUp, Users, Package, Award, Clock, MapPin, Star, Truck, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const iconOptions = [
  { value: 'trending-up', label: 'Trending Up', icon: TrendingUp },
  { value: 'users', label: 'Users', icon: Users },
  { value: 'package', label: 'Package', icon: Package },
  { value: 'award', label: 'Award', icon: Award },
  { value: 'clock', label: 'Clock', icon: Clock },
  { value: 'map-pin', label: 'Map Pin', icon: MapPin },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'truck', label: 'Truck', icon: Truck },
]

export default function StatisticsPage() {
  const [stats, setStats] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStat, setEditingStat] = useState(null)
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    icon: 'trending-up',
    color: 'blue',
    order: 1,
    prefix: '',
    suffix: '',
    isAnimated: true
  })

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null) // { type: 'success' | 'error', message: string }

  const showFeedback = (type, message) => {
    setFeedback({ type, message })
    setTimeout(() => setFeedback(null), 4000)
  }

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/statistics')
      const json = await res.json()
      if (json.success) {
        setStats(json.data)
      } else {
        showFeedback('error', 'Failed to load statistics')
      }
    } catch (err) {
      showFeedback('error', 'Error fetching statistics: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const handleAdd = () => {
    setEditingStat(null)
    setFormData({
      label: '',
      value: '',
      icon: 'trending-up',
      color: 'blue',
      order: stats.length + 1,
      prefix: '',
      suffix: '',
      isAnimated: true
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (stat) => {
    setEditingStat(stat)
    setFormData({
      label: stat.label,
      value: stat.value,
      icon: stat.icon,
      color: stat.color,
      order: stat.order,
      prefix: stat.prefix || '',
      suffix: stat.suffix || '',
      isAnimated: stat.isAnimated
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      if (editingStat) {
        const res = await fetch(`/api/statistics/${editingStat.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            label: formData.label,
            value: formData.value,
            prefix: formData.prefix,
            suffix: formData.suffix,
            icon: formData.icon,
            color: formData.color,
            order: formData.order,
            isAnimated: formData.isAnimated
          })
        })
        const json = await res.json()
        if (json.success) {
          setStats(stats.map(s => s.id === editingStat.id ? json.data : s))
          showFeedback('success', 'Statistic updated successfully')
          setIsDialogOpen(false)
        } else {
          showFeedback('error', json.message || 'Failed to update statistic')
        }
      } else {
        const res = await fetch('/api/statistics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            label: formData.label,
            value: formData.value,
            prefix: formData.prefix,
            suffix: formData.suffix,
            icon: formData.icon,
            color: formData.color,
            order: formData.order,
            isAnimated: formData.isAnimated
          })
        })
        const json = await res.json()
        if (json.success) {
          setStats([...stats, json.data])
          showFeedback('success', 'Statistic added successfully')
          setIsDialogOpen(false)
        } else {
          showFeedback('error', json.message || 'Failed to add statistic')
        }
      }
    } catch (err) {
      showFeedback('error', 'Error saving statistic: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this statistic?')) return

    try {
      const res = await fetch(`/api/statistics/${id}`, {
        method: 'DELETE'
      })
      const json = await res.json()
      if (json.success) {
        setStats(stats.filter(s => s.id !== id))
        showFeedback('success', 'Statistic deleted successfully')
      } else {
        showFeedback('error', json.message || 'Failed to delete statistic')
      }
    } catch (err) {
      showFeedback('error', 'Error deleting statistic: ' + err.message)
    }
  }

  const handleToggleActive = async (id) => {
    const stat = stats.find(s => s.id === id)
    if (!stat) return
    const newValue = !stat.isActive
    try {
      const res = await fetch(`/api/statistics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newValue })
      })
      const json = await res.json()
      if (json.success) {
        setStats(stats.map(s => s.id === id ? json.data : s))
        showFeedback('success', `Statistic ${newValue ? 'activated' : 'deactivated'} successfully`)
      } else {
        showFeedback('error', json.message || 'Failed to update status')
      }
    } catch (err) {
      showFeedback('error', 'Error updating status: ' + err.message)
    }
  }

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName)
    return iconOption ? iconOption.icon : TrendingUp
  }

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading statistics...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Statistics</h1>
        <p className="text-muted-foreground mt-2">Manage your website statistics and counters</p>
      </div>

      {/* Feedback Banner */}
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

      {/* Preview Section */}
      <div className="mb-6 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Preview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats
            .filter(s => s.isActive)
            .sort((a, b) => a.order - b.order)
            .map((stat) => {
              const IconComponent = getIconComponent(stat.icon)
              return (
                <div key={stat.id} className="text-center bg-card rounded-lg p-4 border">
                  <div className="inline-block p-3 bg-primary rounded-full mb-3">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">
                    {stat.prefix}{stat.value}{stat.suffix}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              )
            })}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Total Stats</div>
          <div className="text-2xl font-bold text-foreground">{stats.length}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Active</div>
          <div className="text-2xl font-bold text-primary">
            {stats.filter(s => s.isActive).length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Animated</div>
          <div className="text-2xl font-bold text-primary">
            {stats.filter(s => s.isAnimated).length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Last Updated</div>
          <div className="text-sm font-semibold text-foreground">
            {stats.length > 0
              ? new Date(Math.max(...stats.map(s => new Date(s.updatedAt || s.createdAt)))).toLocaleDateString()
              : 'N/A'}
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search statistics..."
            className="w-64"
          />
          <Select defaultValue="all">
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
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Statistic
        </Button>
      </div>

      {/* Statistics Table */}
      <div className="overflow-x-auto">
        <div className="bg-card rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Label
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Display
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Animation
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
              {stats.sort((a, b) => a.order - b.order).map((stat) => {
                const IconComponent = getIconComponent(stat.icon)
                return (
                  <tr key={stat.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {stat.order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex p-2 rounded-lg bg-primary/10">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">{stat.label}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">{stat.value}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-muted-foreground">
                        {stat.prefix}{stat.value}{stat.suffix}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        stat.isAnimated
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {stat.isAnimated ? 'Animated' : 'Static'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(stat.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          stat.isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {stat.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(stat)}
                          className="text-primary hover:text-primary/80"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(stat.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {stats.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <AlertCircle className="w-10 h-10 mb-3" />
              <p className="text-lg font-medium">No statistics found</p>
              <p className="text-sm">Add your first statistic to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90%]">
          <DialogHeader>
            <DialogTitle>{editingStat ? 'Edit Statistic' : 'Add New Statistic'}</DialogTitle>
            <DialogDescription>
              {editingStat ? 'Update the statistic details' : 'Add a new statistic to display on your website'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Happy Customers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g., 10000"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prefix">Prefix</Label>
                <Input
                  id="prefix"
                  value={formData.prefix}
                  onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                  placeholder="e.g., $"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                  id="suffix"
                  value={formData.suffix}
                  onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                  placeholder="e.g., +"
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => {
                      const IconComp = option.icon
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <IconComp className="w-4 h-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color Theme</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="yellow">Yellow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isAnimated"
                checked={formData.isAnimated}
                onCheckedChange={(checked) => setFormData({ ...formData, isAnimated: checked })}
              />
              <Label htmlFor="isAnimated">Enable counter animation</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingStat ? 'Update' : 'Add'} Statistic
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
