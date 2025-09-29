"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash, Save, X, Loader2, Upload, Image as ImageIcon, Calendar, Target, Eye, Users, Trophy, Heart } from "lucide-react"
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
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagePicker } from "@/components/ui/image-picker"


const INITIAL_DATA = {
  yearsExperience: 14,
  happyCustomers: 10000,
  movesCompleted: 50000,
  satisfaction: "100%",
  story: { 
    title: "Our Story", 
    content: "Founded in 2010, Maritalia Furniture began with a simple mission: to provide reliable, efficient, and careful furniture moving services to the residents of Dubai.\n\nWhat started as a small family business has grown into one of the most trusted furniture moving companies in the UAE. Our journey has been marked by continuous growth, innovation, and an unwavering commitment to customer satisfaction.\n\nToday, we're proud to have helped thousands of families and businesses safely transport their furniture across the UAE and beyond. Building a reputation for reliability, professionalism, and excellence."
  },
  journey: [
    { year: "2010", detail: "Maritalia Furniture Moving Founded in Dubai" },
    { year: "2013", detail: "Expanded services across UAE" },
    { year: "2014", detail: "Introduced premium packing solutions" }
  ],
  mission: { 
    description: "To provide exceptional furniture moving services that exceed customer expectations through reliability, care, and attention to detail.",
    points: ["Safe and secure transportation", "Timely delivery", "Professional handling", "Transparent pricing"]
  },
  vision: { 
    description: "To be the leading furniture moving company in the UAE, known for our exceptional service, reliability, and customer satisfaction.",
    points: ["Industry leadership", "Customer first approach", "Continuous improvement", "Community engagement"]
  },
  coreValues: [
    { title: "Customer First", detail: "Your satisfaction is our top priority in every move we make.", icon: "users" },
    { title: "Trust & Safety", detail: "We handle your furniture with care and ensure secure transportation", icon: "shield" },
    { title: "Excellence", detail: "We strive for excellence in every aspect of our service", icon: "trophy" },
    { title: "Innovation", detail: "Continuously improving our services with modern solutions.", icon: "innovation" }
  ],
  images: {
    hero: "",
    story: "",
    team: "",
    mission: "",
    vision: ""
  }
}

const iconOptions = {
  users: Users,
  shield: Heart,
  trophy: Trophy,
  innovation: Eye,
  calendar: Calendar,
  target: Target
}

export default function AboutPage() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
  const [currentImageField, setCurrentImageField] = useState("")
  const [formData, setFormData] = useState(INITIAL_DATA)
  const [activeTab, setActiveTab] = useState("content")

  // Fetch AboutUs
  const fetchAbout = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/about")
      const result = await res.json()
      if (result.length > 0) {
        setAbout(result[0])
        setFormData(result[0].data)
      } else {
        setAbout(null)
        setFormData(INITIAL_DATA)
      }
    } catch (err) {
      console.error("Error fetching AboutUs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAbout()
  }, [])

  const handleSubmit = async () => {
    try {
      setProcessing(true)
      const method = about ? "PUT" : "POST"
      const url = about ? `/api/about/${about.id}` : "/api/about"

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setIsModalOpen(false)
      await fetchAbout()
    } catch (err) {
      console.error("Error saving AboutUs:", err)
    } finally {
      setProcessing(false)
    }
  }

  const handleDelete = async () => {
    if (!about) return
    if (!confirm("Are you sure you want to delete About Us?")) return
    try {
      setDeleting(true)
      await fetch(`/api/about/${about.id}`, { method: "DELETE" })
      setAbout(null)
      setFormData(INITIAL_DATA)
    } catch (err) {
      console.error("Error deleting AboutUs:", err)
    } finally {
      setDeleting(false)
    }
  }

  // Image handling
  const openImagePicker = (field) => {
    setCurrentImageField(field)
    setIsImagePickerOpen(true)
  }

  const handleImageSelect = (imageUrl) => {
    if (currentImageField) {
      setFormData({
        ...formData,
        images: {
          ...formData.images,
          [currentImageField]: imageUrl
        }
      })
    }
    setIsImagePickerOpen(false)
    setCurrentImageField("")
  }

  const removeImage = (field) => {
    setFormData({
      ...formData,
      images: {
        ...formData.images,
        [field]: ""
      }
    })
  }

  // Add item to journey
  const addJourneyItem = () => {
    setFormData({
      ...formData,
      journey: [...formData.journey, { year: "", detail: "" }],
    })
  }

  const updateJourneyItem = (idx, field, value) => {
    const updated = [...formData.journey]
    updated[idx][field] = value
    setFormData({ ...formData, journey: updated })
  }

  const deleteJourneyItem = (idx) => {
    const updated = formData.journey.filter((_, i) => i !== idx)
    setFormData({ ...formData, journey: updated })
  }

  // Add core value
  const addCoreValue = () => {
    setFormData({
      ...formData,
      coreValues: [...formData.coreValues, { title: "", detail: "", icon: "users" }],
    })
  }

  const updateCoreValue = (idx, field, value) => {
    const updated = [...formData.coreValues]
    updated[idx][field] = value
    setFormData({ ...formData, coreValues: updated })
  }

  const deleteCoreValue = (idx) => {
    const updated = formData.coreValues.filter((_, i) => i !== idx)
    setFormData({ ...formData, coreValues: updated })
  }

  // Add mission point
  const addMissionPoint = () => {
    setFormData({
      ...formData,
      mission: {
        ...formData.mission,
        points: [...formData.mission.points, ""]
      }
    })
  }

  const updateMissionPoint = (idx, value) => {
    const updated = [...formData.mission.points]
    updated[idx] = value
    setFormData({
      ...formData,
      mission: { ...formData.mission, points: updated }
    })
  }

  const deleteMissionPoint = (idx) => {
    const updated = formData.mission.points.filter((_, i) => i !== idx)
    setFormData({
      ...formData,
      mission: { ...formData.mission, points: updated }
    })
  }

  // Add vision point
  const addVisionPoint = () => {
    setFormData({
      ...formData,
      vision: {
        ...formData.vision,
        points: [...formData.vision.points, ""]
      }
    })
  }

  const updateVisionPoint = (idx, value) => {
    const updated = [...formData.vision.points]
    updated[idx] = value
    setFormData({
      ...formData,
      vision: { ...formData.vision, points: updated }
    })
  }

  const deleteVisionPoint = (idx) => {
    const updated = formData.vision.points.filter((_, i) => i !== idx)
    setFormData({
      ...formData,
      vision: { ...formData.vision, points: updated }
    })
  }

  // Stats display component - FIXED: Add null check
  const StatsDisplay = () => {
    if (!about || !about.data) return null
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{about.data.yearsExperience}+</div>
          <div className="text-sm text-gray-600">Years Experience</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{about.data.happyCustomers?.toLocaleString()}+</div>
          <div className="text-sm text-gray-600">Happy Customers</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">{about.data.movesCompleted?.toLocaleString()}+</div>
          <div className="text-sm text-gray-600">Moves Completed</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-3xl font-bold text-orange-600">{about.data.satisfaction}</div>
          <div className="text-sm text-gray-600">Satisfaction Rate</div>
        </div>
      </div>
    )
  }

  // Image preview component
  const ImagePreview = ({ imageUrl, field, label }) => (
    <div className="border rounded-lg p-4">
      <Label className="block mb-2">{label}</Label>
      {imageUrl ? (
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={label}
            className="w-full h-32 object-cover rounded-md"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => removeImage(field)}
          >
            <Trash className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => openImagePicker(field)}
        >
          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600">Click to select {label}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg">
                {about ? 'Updating about page...' : 'Creating about page...'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Deleting Overlay */}
      {deleting && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg">Deleting about page...</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us Management</h1>
          <p className="text-gray-600">Manage your company's about page content</p>
        </div>
        <div className="flex gap-2">
          {about && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={processing || deleting}
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash className="w-4 h-4 mr-2" />
              )}
              Delete
            </Button>
          )}
          <Button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={processing || deleting}
          >
            <Edit className="w-4 h-4 mr-2" />
            {about ? "Edit Content" : "Create About Us"}
          </Button>
        </div>
      </div>

      {/* Display Preview */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : !about ? (
        <Card className="text-center p-12">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No About Us Content</h3>
          <p className="text-gray-600 mb-4">Get started by creating your about us page</p>
          <Button onClick={() => setIsModalOpen(true)}>Create About Us</Button>
        </Card>
      ) : (
        <Card className="bg-white rounded-lg shadow-lg border-0 p-8">
          {/* Stats - FIXED: Only render if about.data exists */}
          <StatsDisplay />

          {/* Hero Image Preview - FIXED: Add null check */}
          {about.data?.images?.hero && (
            <div className="mb-8">
              <img 
                src={about.data.images.hero} 
                alt="Hero" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Story Section - FIXED: Add null checks */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              {about.data?.images?.story && (
                <img 
                  src={about.data.images.story} 
                  alt="Our Story" 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <p className="text-gray-700 whitespace-pre-line">
                {about.data?.story?.content || "No story content available."}
              </p>
            </div>
          </section>

          {/* Journey Timeline - FIXED: Add null checks */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Journey</h2>
            </div>
            <div className="space-y-4">
              {about.data?.journey?.map((j, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white border-l-4 border-blue-500 rounded">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {j.year}
                  </div>
                  <p className="text-gray-700 flex-1">{j.detail}</p>
                </div>
              )) || <p className="text-gray-500">No journey milestones added.</p>}
            </div>
          </section>

          {/* Mission & Vision - FIXED: Add null checks */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <Card className="p-6 bg-purple-50 border-purple-200">
                {about.data?.images?.mission && (
                  <img 
                    src={about.data.images.mission} 
                    alt="Our Mission" 
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-700 mb-4">
                  {about.data?.mission?.description || "No mission description available."}
                </p>
                <ul className="space-y-2">
                  {about.data?.mission?.points?.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  )) || <li className="text-gray-500">No mission points added.</li>}
                </ul>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <Card className="p-6 bg-orange-50 border-orange-200">
                {about.data?.images?.vision && (
                  <img 
                    src={about.data.images.vision} 
                    alt="Our Vision" 
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                )}
                <p className="text-gray-700 mb-4">
                  {about.data?.vision?.description || "No vision description available."}
                </p>
                <ul className="space-y-2">
                  {about.data?.vision?.points?.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  )) || <li className="text-gray-500">No vision points added.</li>}
                </ul>
              </Card>
            </section>
          </div>

          {/* Core Values - FIXED: Add null checks */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.data?.coreValues?.map((cv, idx) => {
                const IconComponent = iconOptions[cv.icon] || Users
                return (
                  <Card key={idx} className="p-6 text-center bg-white border hover:shadow-md transition-shadow">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{cv.title}</h3>
                    <p className="text-gray-600 text-sm">{cv.detail}</p>
                  </Card>
                )
              }) || <p className="text-gray-500 col-span-full text-center">No core values added.</p>}
            </div>
          </section>

          {/* Team Image - FIXED: Add null check */}
          {about.data?.images?.team && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
              <img 
                src={about.data.images.team} 
                alt="Our Team" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </section>
          )}
        </Card>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {about ? "Edit About Us" : "Create About Us"}
            </DialogTitle>
            <DialogDescription>
              Manage all aspects of your about us page
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Years Experience</Label>
                  <Input
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yearsExperience: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Happy Customers</Label>
                  <Input
                    type="number"
                    value={formData.happyCustomers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        happyCustomers: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Moves Completed</Label>
                  <Input
                    type="number"
                    value={formData.movesCompleted}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        movesCompleted: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Satisfaction Rate</Label>
                  <Input
                    value={formData.satisfaction}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        satisfaction: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Story */}
              <div>
                <Label>Our Story</Label>
                <Textarea
                  rows={6}
                  value={formData.story.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      story: { ...formData.story, content: e.target.value },
                    })
                  }
                  placeholder="Tell your company's story..."
                />
              </div>

              {/* Journey */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Company Journey Timeline</Label>
                  <Button variant="outline" size="sm" onClick={addJourneyItem}>
                    <Plus className="w-4 h-4 mr-2" /> Add Milestone
                  </Button>
                </div>
                {formData.journey.map((j, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Year (e.g., 2010)"
                      value={j.year}
                      onChange={(e) =>
                        updateJourneyItem(idx, "year", e.target.value)
                      }
                      className="w-24"
                    />
                    <Input
                      placeholder="Milestone detail"
                      value={j.detail}
                      onChange={(e) =>
                        updateJourneyItem(idx, "detail", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteJourneyItem(idx)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Mission */}
              <div>
                <Label>Mission Statement</Label>
                <Textarea
                  value={formData.mission.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mission: { ...formData.mission, description: e.target.value },
                    })
                  }
                  placeholder="Your mission statement..."
                />
                <div className="mt-2">
                  <Label>Mission Points</Label>
                  {formData.mission.points?.map((point, idx) => (
                    <div key={idx} className="flex gap-2 mt-2">
                      <Input
                        value={point}
                        onChange={(e) => updateMissionPoint(idx, e.target.value)}
                        placeholder="Mission point..."
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteMissionPoint(idx)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addMissionPoint} className="mt-2">
                    <Plus className="w-4 h-4 mr-2" /> Add Point
                  </Button>
                </div>
              </div>

              {/* Vision */}
              <div>
                <Label>Vision Statement</Label>
                <Textarea
                  value={formData.vision.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vision: { ...formData.vision, description: e.target.value },
                    })
                  }
                  placeholder="Your vision statement..."
                />
                <div className="mt-2">
                  <Label>Vision Points</Label>
                  {formData.vision.points?.map((point, idx) => (
                    <div key={idx} className="flex gap-2 mt-2">
                      <Input
                        value={point}
                        onChange={(e) => updateVisionPoint(idx, e.target.value)}
                        placeholder="Vision point..."
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteVisionPoint(idx)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addVisionPoint} className="mt-2">
                    <Plus className="w-4 h-4 mr-2" /> Add Point
                  </Button>
                </div>
              </div>

              {/* Core Values */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Core Values</Label>
                  <Button variant="outline" size="sm" onClick={addCoreValue}>
                    <Plus className="w-4 h-4 mr-2" /> Add Value
                  </Button>
                </div>
                {formData.coreValues.map((cv, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-3 p-3 border rounded">
                    <div className="md:col-span-3">
                      <Input
                        placeholder="Value title"
                        value={cv.title}
                        onChange={(e) =>
                          updateCoreValue(idx, "title", e.target.value)
                        }
                      />
                    </div>
                    <div className="md:col-span-7">
                      <Input
                        placeholder="Value description"
                        value={cv.detail}
                        onChange={(e) =>
                          updateCoreValue(idx, "detail", e.target.value)
                        }
                      />
                    </div>
                    <div className="md:col-span-1">
                      <select
                        value={cv.icon}
                        onChange={(e) => updateCoreValue(idx, "icon", e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        {Object.keys(iconOptions).map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteCoreValue(idx)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ImagePreview 
                  imageUrl={formData.images?.hero}
                  field="hero"
                  label="Hero Image"
                />
                <ImagePreview 
                  imageUrl={formData.images?.story}
                  field="story"
                  label="Story Image"
                />
                <ImagePreview 
                  imageUrl={formData.images?.mission}
                  field="mission"
                  label="Mission Image"
                />
                <ImagePreview 
                  imageUrl={formData.images?.vision}
                  field="vision"
                  label="Vision Image"
                />
                <ImagePreview 
                  imageUrl={formData.images?.team}
                  field="team"
                  label="Team Image"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Modal Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={processing || deleting} className="bg-blue-600 hover:bg-blue-700">
              {processing ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Picker Dialog */}
      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  )
}