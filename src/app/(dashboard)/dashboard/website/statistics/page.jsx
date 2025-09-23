'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, TrendingUp, Users, Package, Award, Clock, MapPin, Star, Truck } from 'lucide-react'
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
  const [stats, setStats] = useState([
    {
      id: 1,
      label: "Years Experience",
      value: "14+",
      icon: "clock",
      color: "blue",
      displayOrder: 1,
      isActive: true,
      prefix: "",
      suffix: "+",
      animated: true
    },
    {
      id: 2,
      label: "Happy Customers",
      value: "10000",
      icon: "users",
      color: "green",
      displayOrder: 2,
      isActive: true,
      prefix: "",
      suffix: "+",
      animated: true
    },
    {
      id: 3,
      label: "Successful Moves",
      value: "50000",
      icon: "truck",
      color: "orange",
      displayOrder: 3,
      isActive: true,
      prefix: "",
      suffix: "+",
      animated: true
    },
    {
      id: 4,
      label: "Satisfaction Rate",
      value: "100",
      icon: "award",
      color: "purple",
      displayOrder: 4,
      isActive: true,
      prefix: "",
      suffix: "%",
      animated: true
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStat, setEditingStat] = useState(null)
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    icon: 'trending-up',
    color: 'blue',
    displayOrder: 1,
    prefix: '',
    suffix: '',
    animated: true
  })

  const handleAdd = () => {
    setEditingStat(null)
    setFormData({
      label: '',
      value: '',
      icon: 'trending-up',
      color: 'blue',
      displayOrder: stats.length + 1,
      prefix: '',
      suffix: '',
      animated: true
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
      displayOrder: stat.displayOrder,
      prefix: stat.prefix || '',
      suffix: stat.suffix || '',
      animated: stat.animated
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    if (editingStat) {
      setStats(stats.map(s =>
        s.id === editingStat.id
          ? { ...s, ...formData }
          : s
      ))
    } else {
      const newStat = {
        id: stats.length + 1,
        ...formData,
        isActive: true
      }
      setStats([...stats, newStat])
    }
    setIsDialogOpen(false)
  }

  const handleDelete = (id) => {
    setStats(stats.filter(s => s.id !== id))
  }

  const handleToggleActive = (id) => {
    setStats(stats.map(s =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ))
  }

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName)
    return iconOption ? iconOption.icon : TrendingUp
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Statistics</h1>
        <p className="text-muted-foreground mt-2">Manage your website statistics and counters</p>
      </div>

      {/* Preview Section */}
      <div className="mb-6 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Preview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats
            .filter(s => s.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder)
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
            {stats.filter(s => s.animated).length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Last Updated</div>
          <div className="text-sm font-semibold text-foreground">Today</div>
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
              {stats.sort((a, b) => a.displayOrder - b.displayOrder).map((stat) => {
                const IconComponent = getIconComponent(stat.icon)
                return (
                  <tr key={stat.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {stat.displayOrder}
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
                        stat.animated
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {stat.animated ? 'Animated' : 'Static'}
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
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
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
                id="animated"
                checked={formData.animated}
                onCheckedChange={(checked) => setFormData({ ...formData, animated: checked })}
              />
              <Label htmlFor="animated">Enable counter animation</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingStat ? 'Update' : 'Add'} Statistic
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}