'use client'

import { useState, useEffect } from 'react'
import {
  Save, Mail, Phone, MapPin, Clock, Globe,
  Facebook, Instagram, Twitter, Linkedin, Youtube,
  Building, MessageSquare, Image, Loader2, CheckCircle, XCircle, AlertCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagePicker } from "@/components/ui/image-picker"

const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
]

const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

export default function ContactInfoPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    whatsapp: '',
    address: '',
    city: '',
    emirate: '',
    country: 'UAE',
    postalCode: '',
    googleMapsUrl: '',
    logoUrl: '',
    darkLogoUrl: '',
    faviconUrl: '',
    workingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed'
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: ''
    }
  })
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const showFeedback = (type, message) => {
    setFeedback({ type, message })
    setTimeout(() => setFeedback(null), 4000)
  }
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [imagePickerTarget, setImagePickerTarget] = useState('logoUrl')

  // Fetch contact info from API
  const fetchContactInfo = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/contact-info')
      const result = await response.json()

      if (result.success) {
        setFormData(result.data)
      } else {
        console.error('Failed to fetch contact info:', result.message)
      }
    } catch (error) {
      console.error('Error fetching contact info:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load contact info on component mount
  useEffect(() => {
    fetchContactInfo()
  }, [])

  const handleSubmit = async () => {
    try {
      setProcessing(true)

      const response = await fetch('/api/contact-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        showFeedback('success', 'Contact information saved successfully!')
      } else {
        console.error('Failed to save contact info:', result.message)
        showFeedback('error', 'Failed to save contact information.')
      }
    } catch (error) {
      console.error('Error saving contact info:', error)
      showFeedback('error', 'An error occurred while saving contact information.')
    } finally {
      setProcessing(false)
    }
  }

  const handleWorkingHoursChange = (day, value) => {
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [day]: value
      }
    })
  }

  const handleSocialLinksChange = (platform, value) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value
      }
    })
  }

  const handleImageSelect = (imageUrl) => {
    setFormData({ ...formData, [imagePickerTarget]: imageUrl })
    setIsImagePickerOpen(false)
  }

  const openImagePicker = (target) => {
    setImagePickerTarget(target)
    setIsImagePickerOpen(true)
  }

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading contact information...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Information</h1>
          <p className="text-muted-foreground mt-2">Manage your company details, logos, and social media links</p>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={processing || !formData.companyName || !formData.email || !formData.phone || !formData.address}
          className="bg-primary hover:bg-primary/90"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
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

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Primary Email</p>
            <p className="font-medium text-foreground">{formData.email || 'Not set'}</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Primary Phone</p>
            <p className="font-medium text-foreground">{formData.phone || 'Not set'}</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">WhatsApp</p>
            <p className="font-medium text-foreground">{formData.whatsapp || 'Not set'}</p>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-medium text-foreground">{formData.city && formData.emirate ? `${formData.city}, ${formData.emirate}` : 'Not set'}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="logos">Logos</TabsTrigger>
        </TabsList>

        {/* Company Information Tab */}
        <TabsContent value="company" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Building className="w-5 h-5" />
              Company Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Contact Details Tab */}
        <TabsContent value="contact" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Phone className="w-5 h-5" />
              Contact Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="info@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Address Information Tab */}
        <TabsContent value="address" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <MapPin className="w-5 h-5" />
              Address Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emirate">Emirate</Label>
                  <Select value={formData.emirate} onValueChange={(value) => setFormData({ ...formData, emirate: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select emirate" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMIRATES.map((emirate) => (
                        <SelectItem key={emirate} value={emirate}>
                          {emirate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="UAE"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="12345"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
                <Input
                  id="googleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Working Hours Tab */}
        <TabsContent value="hours" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Clock className="w-5 h-5" />
              Working Hours
            </h2>
            <div className="space-y-3">
              {DAYS.map((day) => (
                <div key={day} className="grid grid-cols-3 gap-4 items-center">
                  <Label className="capitalize">{day}</Label>
                  <div className="col-span-2">
                    <Input
                      value={formData.workingHours[day]}
                      onChange={(e) => handleWorkingHoursChange(day, e.target.value)}
                      placeholder="e.g., 9:00 AM - 6:00 PM or Closed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Social Media Links Tab */}
        <TabsContent value="social" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Globe className="w-5 h-5" />
              Social Media Links
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => handleSocialLinksChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => handleSocialLinksChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialLinksChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialLinksChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube" className="flex items-center gap-2">
                  <Youtube className="w-4 h-4" />
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  value={formData.socialLinks.youtube}
                  onChange={(e) => handleSocialLinksChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Logos Tab */}
        <TabsContent value="logos" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Image className="w-5 h-5" />
              Company Logos
            </h2>
            <div className="space-y-6">
              {/* Primary Logo */}
              <div className="space-y-2">
                <Label>Primary Logo</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter logo URL"
                      value={formData.logoUrl}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => openImagePicker('logoUrl')}
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                  {formData.logoUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.logoUrl}
                        alt="Logo Preview"
                        className="h-20 object-contain bg-muted/50 p-2 rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Dark Logo */}
              <div className="space-y-2">
                <Label>Dark Mode Logo (Optional)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter dark logo URL"
                      value={formData.darkLogoUrl}
                      onChange={(e) => setFormData({ ...formData, darkLogoUrl: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => openImagePicker('darkLogoUrl')}
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                  {formData.darkLogoUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.darkLogoUrl}
                        alt="Dark Logo Preview"
                        className="h-20 object-contain bg-muted p-2 rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Favicon */}
              <div className="space-y-2">
                <Label>Favicon (Optional)</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter favicon URL"
                      value={formData.faviconUrl}
                      onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => openImagePicker('faviconUrl')}
                    >
                      <Image className="w-4 h-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                  {formData.faviconUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.faviconUrl}
                        alt="Favicon Preview"
                        className="w-8 h-8 object-contain bg-muted/50 p-1 rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Image Picker */}
      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={handleImageSelect}
        selectedImageUrl={formData[imagePickerTarget]}
      />

    </div>
  )
}