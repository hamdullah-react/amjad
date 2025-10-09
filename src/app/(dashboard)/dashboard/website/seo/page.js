'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImagePicker } from '@/components/ui/image-picker';
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Globe,
  Share2,
  Twitter,
  Database,
  Map,
  BarChart,
  Code,
  X,
  Plus,
  Save
} from 'lucide-react';

const StatCard = ({ title, value, className = '' }) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className={`text-2xl font-bold ${className}`}>{value}</div>
  </div>
)

export default function SEOPage() {
  const [seoData, setSeoData] = useState({
    // Global SEO
    siteTitle: '',
    titleSeparator: '|',
    siteDescription: '',
    keywords: [],
    author: '',
    robots: 'index, follow',
    googleVerification: '',
    bingVerification: '',

    // Open Graph
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogType: 'website',
    ogUrl: '',

    // Twitter Card
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',

    // Schema Markup
    schemaType: 'LocalBusiness',
    schemaBusinessName: '',
    schemaBusinessType: 'MovingCompany',
    schemaPriceRange: '$$',
    schemaLogo: '',
    schemaImage: '',
    schemaAddress: '',
    schemaPhone: '',
    schemaEmail: '',
    schemaOpeningHours: [],
    schemaGeoLatitude: '',
    schemaGeoLongitude: '',
    schemaRating: '',
    schemaReviewCount: '',

    // Sitemap
    sitemapEnabled: true,
    sitemapChangeFrequency: 'weekly',
    sitemapPriority: '0.8',
    excludedPages: [],

    // Analytics & Tracking
    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',
    hotjarId: '',
    clarityProjectId: '',

    // Advanced
    canonicalUrl: '',
    alternateLanguages: [],
    structuredDataEnabled: true,
    richSnippetsEnabled: true,
    breadcrumbsEnabled: true,
    faqSchemaEnabled: true,
    localBusinessSchemaEnabled: true,
    customHeadScripts: '',
    customBodyScripts: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newExcludedPage, setNewExcludedPage] = useState('');
  const [newLanguage, setNewLanguage] = useState({ code: '', url: '' });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [imageTarget, setImageTarget] = useState('');

  useEffect(() => {
    fetchSEOData();
  }, []);

  const fetchSEOData = async () => {
    try {
      const response = await fetch('/api/seo');
      const result = await response.json();
      if (result.success) {
        setSeoData(result.data);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(seoData),
      });

      const result = await response.json();
      if (result.success) {
        // Show success message
      }
    } catch (error) {
      console.error('Error saving SEO data:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageSelect = (url) => {
    setSeoData({ ...seoData, [imageTarget]: url });
    setGalleryOpen(false);
    setImageTarget('');
  };

  const addKeyword = () => {
    if (newKeyword.trim()) {
      setSeoData({
        ...seoData,
        keywords: [...(seoData.keywords || []), newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    setSeoData({
      ...seoData,
      keywords: seoData.keywords.filter((_, i) => i !== index)
    });
  };

  const addExcludedPage = () => {
    if (newExcludedPage.trim()) {
      setSeoData({
        ...seoData,
        excludedPages: [...(seoData.excludedPages || []), newExcludedPage.trim()]
      });
      setNewExcludedPage('');
    }
  };

  const removeExcludedPage = (index) => {
    setSeoData({
      ...seoData,
      excludedPages: seoData.excludedPages.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    if (newLanguage.code && newLanguage.url) {
      setSeoData({
        ...seoData,
        alternateLanguages: [...(seoData.alternateLanguages || []), newLanguage]
      });
      setNewLanguage({ code: '', url: '' });
    }
  };

  const removeLanguage = (index) => {
    setSeoData({
      ...seoData,
      alternateLanguages: seoData.alternateLanguages.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">SEO Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage search engine optimization and meta tags
        </p>
        <div className="mt-4">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Keywords" value={seoData.keywords?.length || 0} className="text-primary" />
        <StatCard title="Schema Enabled" value={seoData.structuredDataEnabled ? "Yes" : "No"} className={seoData.structuredDataEnabled ? "text-primary" : "text-muted-foreground"} />
        <StatCard title="Sitemap" value={seoData.sitemapEnabled ? "Enabled" : "Disabled"} className={seoData.sitemapEnabled ? "text-primary" : "text-muted-foreground"} />
        <StatCard title="Languages" value={seoData.alternateLanguages?.length || 0} className="text-primary" />
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <Tabs defaultValue="global" className="w-full ">
          <TabsList className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          <TabsTrigger value="global" className="flex items-center gap-1">
            <Search className="h-3 w-3" />
            Global
          </TabsTrigger>
          <TabsTrigger value="opengraph" className="flex items-center gap-1">
            <Share2 className="h-3 w-3" />
            Open Graph
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center gap-1">
            <Twitter className="h-3 w-3" />
            Twitter
          </TabsTrigger>
          <TabsTrigger value="schema" className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            Schema
          </TabsTrigger>
          <TabsTrigger value="sitemap" className="flex items-center gap-1">
            <Map className="h-3 w-3" />
            Sitemap
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart className="h-3 w-3" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Code className="h-3 w-3" />
            Advanced
          </TabsTrigger>
          <TabsTrigger value="international" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            International
          </TabsTrigger>
          </TabsList>

          {/* Global SEO */}
          <TabsContent value="global">
            <Card className="border">
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
              <CardDescription>
                Basic SEO configuration for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={seoData.siteTitle}
                    onChange={(e) => setSeoData({ ...seoData, siteTitle: e.target.value })}
                    placeholder="Your Site Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="titleSeparator">Title Separator</Label>
                  <Select
                    value={seoData.titleSeparator}
                    onValueChange={(value) => setSeoData({ ...seoData, titleSeparator: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="|">|</SelectItem>
                      <SelectItem value="-">-</SelectItem>
                      <SelectItem value="–">–</SelectItem>
                      <SelectItem value="—">—</SelectItem>
                      <SelectItem value=":">:</SelectItem>
                      <SelectItem value="·">·</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={seoData.siteDescription}
                  onChange={(e) => setSeoData({ ...seoData, siteDescription: e.target.value })}
                  placeholder="Brief description of your website"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Keywords</Label>
                <div className="flex gap-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add a keyword"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                  />
                  <Button onClick={addKeyword} type="button" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoData.keywords?.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 bg-muted text-muted-foreground hover:bg-muted/50">
                      {keyword}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-foreground"
                        onClick={() => removeKeyword(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={seoData.author}
                    onChange={(e) => setSeoData({ ...seoData, author: e.target.value })}
                    placeholder="Website author"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="robots">Robots</Label>
                  <Select
                    value={seoData.robots}
                    onValueChange={(value) => setSeoData({ ...seoData, robots: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index, follow">index, follow</SelectItem>
                      <SelectItem value="index, nofollow">index, nofollow</SelectItem>
                      <SelectItem value="noindex, follow">noindex, follow</SelectItem>
                      <SelectItem value="noindex, nofollow">noindex, nofollow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="googleVerification">Google Verification Code</Label>
                  <Input
                    id="googleVerification"
                    value={seoData.googleVerification}
                    onChange={(e) => setSeoData({ ...seoData, googleVerification: e.target.value })}
                    placeholder="Google site verification code"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bingVerification">Bing Verification Code</Label>
                  <Input
                    id="bingVerification"
                    value={seoData.bingVerification}
                    onChange={(e) => setSeoData({ ...seoData, bingVerification: e.target.value })}
                    placeholder="Bing site verification code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Open Graph */}
          <TabsContent value="opengraph">
            <Card className="border">
            <CardHeader>
              <CardTitle>Open Graph Settings</CardTitle>
              <CardDescription>
                Control how your content appears when shared on social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">OG Title</Label>
                  <Input
                    id="ogTitle"
                    value={seoData.ogTitle}
                    onChange={(e) => setSeoData({ ...seoData, ogTitle: e.target.value })}
                    placeholder="Open Graph title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ogType">OG Type</Label>
                  <Select
                    value={seoData.ogType}
                    onValueChange={(value) => setSeoData({ ...seoData, ogType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="profile">Profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogDescription">OG Description</Label>
                <Textarea
                  id="ogDescription"
                  value={seoData.ogDescription}
                  onChange={(e) => setSeoData({ ...seoData, ogDescription: e.target.value })}
                  placeholder="Open Graph description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogUrl">OG URL</Label>
                <Input
                  id="ogUrl"
                  value={seoData.ogUrl}
                  onChange={(e) => setSeoData({ ...seoData, ogUrl: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">OG Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="ogImage"
                    value={seoData.ogImage}
                    onChange={(e) => setSeoData({ ...seoData, ogImage: e.target.value })}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImageTarget('ogImage');
                      setGalleryOpen(true);
                    }}
                  >
                    Gallery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Twitter Card */}
          <TabsContent value="twitter">
            <Card className="border">
            <CardHeader>
              <CardTitle>Twitter Card Settings</CardTitle>
              <CardDescription>
                Customize how your content appears on Twitter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitterCard">Card Type</Label>
                <Select
                  value={seoData.twitterCard}
                  onValueChange={(value) => setSeoData({ ...seoData, twitterCard: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                    <SelectItem value="app">App</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitterSite">Twitter Site (@username)</Label>
                  <Input
                    id="twitterSite"
                    value={seoData.twitterSite}
                    onChange={(e) => setSeoData({ ...seoData, twitterSite: e.target.value })}
                    placeholder="@yoursite"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterCreator">Twitter Creator (@username)</Label>
                  <Input
                    id="twitterCreator"
                    value={seoData.twitterCreator}
                    onChange={(e) => setSeoData({ ...seoData, twitterCreator: e.target.value })}
                    placeholder="@creator"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterTitle">Twitter Title</Label>
                <Input
                  id="twitterTitle"
                  value={seoData.twitterTitle}
                  onChange={(e) => setSeoData({ ...seoData, twitterTitle: e.target.value })}
                  placeholder="Twitter card title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterDescription">Twitter Description</Label>
                <Textarea
                  id="twitterDescription"
                  value={seoData.twitterDescription}
                  onChange={(e) => setSeoData({ ...seoData, twitterDescription: e.target.value })}
                  placeholder="Twitter card description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterImage">Twitter Image</Label>
                <div className="flex gap-2">
                  <Input
                    id="twitterImage"
                    value={seoData.twitterImage}
                    onChange={(e) => setSeoData({ ...seoData, twitterImage: e.target.value })}
                    placeholder="Image URL"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImageTarget('twitterImage');
                      setGalleryOpen(true);
                    }}
                  >
                    Gallery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Schema Markup */}
          <TabsContent value="schema">
            <Card className="border">
            <CardHeader>
              <CardTitle>Schema Markup Settings</CardTitle>
              <CardDescription>
                Structured data for rich snippets in search results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schemaType">Schema Type</Label>
                  <Select
                    value={seoData.schemaType}
                    onValueChange={(value) => setSeoData({ ...seoData, schemaType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LocalBusiness">Local Business</SelectItem>
                      <SelectItem value="Organization">Organization</SelectItem>
                      <SelectItem value="Corporation">Corporation</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schemaBusinessType">Business Type</Label>
                  <Select
                    value={seoData.schemaBusinessType}
                    onValueChange={(value) => setSeoData({ ...seoData, schemaBusinessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MovingCompany">Moving Company</SelectItem>
                      <SelectItem value="StorageFacility">Storage Facility</SelectItem>
                      <SelectItem value="LogisticsCompany">Logistics Company</SelectItem>
                      <SelectItem value="GeneralContractor">General Contractor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schemaBusinessName">Business Name</Label>
                  <Input
                    id="schemaBusinessName"
                    value={seoData.schemaBusinessName}
                    onChange={(e) => setSeoData({ ...seoData, schemaBusinessName: e.target.value })}
                    placeholder="Your business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schemaPriceRange">Price Range</Label>
                  <Select
                    value={seoData.schemaPriceRange}
                    onValueChange={(value) => setSeoData({ ...seoData, schemaPriceRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$">$ (Inexpensive)</SelectItem>
                      <SelectItem value="$$">$$ (Moderate)</SelectItem>
                      <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                      <SelectItem value="$$$$">$$$$ (Very Expensive)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schemaLogo">Business Logo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="schemaLogo"
                      value={seoData.schemaLogo}
                      onChange={(e) => setSeoData({ ...seoData, schemaLogo: e.target.value })}
                      placeholder="Logo URL"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImageTarget('schemaLogo');
                        setGalleryOpen(true);
                      }}
                    >
                      Gallery
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schemaImage">Business Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id="schemaImage"
                      value={seoData.schemaImage}
                      onChange={(e) => setSeoData({ ...seoData, schemaImage: e.target.value })}
                      placeholder="Image URL"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImageTarget('schemaImage');
                        setGalleryOpen(true);
                      }}
                    >
                      Gallery
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schemaAddress">Business Address</Label>
                <Input
                  id="schemaAddress"
                  value={seoData.schemaAddress}
                  onChange={(e) => setSeoData({ ...seoData, schemaAddress: e.target.value })}
                  placeholder="Full business address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schemaPhone">Phone</Label>
                  <Input
                    id="schemaPhone"
                    value={seoData.schemaPhone}
                    onChange={(e) => setSeoData({ ...seoData, schemaPhone: e.target.value })}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schemaEmail">Email</Label>
                  <Input
                    id="schemaEmail"
                    value={seoData.schemaEmail}
                    onChange={(e) => setSeoData({ ...seoData, schemaEmail: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schemaRating">Rating</Label>
                  <Input
                    id="schemaRating"
                    value={seoData.schemaRating}
                    onChange={(e) => setSeoData({ ...seoData, schemaRating: e.target.value })}
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schemaGeoLatitude">Latitude</Label>
                  <Input
                    id="schemaGeoLatitude"
                    value={seoData.schemaGeoLatitude}
                    onChange={(e) => setSeoData({ ...seoData, schemaGeoLatitude: e.target.value })}
                    placeholder="25.2048"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schemaGeoLongitude">Longitude</Label>
                  <Input
                    id="schemaGeoLongitude"
                    value={seoData.schemaGeoLongitude}
                    onChange={(e) => setSeoData({ ...seoData, schemaGeoLongitude: e.target.value })}
                    placeholder="55.2708"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="localBusinessSchemaEnabled"
                  checked={seoData.localBusinessSchemaEnabled}
                  onCheckedChange={(checked) => setSeoData({ ...seoData, localBusinessSchemaEnabled: checked })}
                />
                <Label htmlFor="localBusinessSchemaEnabled">
                  Enable Local Business Schema
                </Label>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Sitemap */}
          <TabsContent value="sitemap">
            <Card className="border">
            <CardHeader>
              <CardTitle>Sitemap Settings</CardTitle>
              <CardDescription>
                Configure XML sitemap generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="sitemapEnabled"
                  checked={seoData.sitemapEnabled}
                  onCheckedChange={(checked) => setSeoData({ ...seoData, sitemapEnabled: checked })}
                />
                <Label htmlFor="sitemapEnabled">
                  Enable Sitemap Generation
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sitemapChangeFrequency">Change Frequency</Label>
                  <Select
                    value={seoData.sitemapChangeFrequency}
                    onValueChange={(value) => setSeoData({ ...seoData, sitemapChangeFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sitemapPriority">Default Priority</Label>
                  <Select
                    value={seoData.sitemapPriority}
                    onValueChange={(value) => setSeoData({ ...seoData, sitemapPriority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.0">0.0</SelectItem>
                      <SelectItem value="0.1">0.1</SelectItem>
                      <SelectItem value="0.2">0.2</SelectItem>
                      <SelectItem value="0.3">0.3</SelectItem>
                      <SelectItem value="0.4">0.4</SelectItem>
                      <SelectItem value="0.5">0.5</SelectItem>
                      <SelectItem value="0.6">0.6</SelectItem>
                      <SelectItem value="0.7">0.7</SelectItem>
                      <SelectItem value="0.8">0.8</SelectItem>
                      <SelectItem value="0.9">0.9</SelectItem>
                      <SelectItem value="1.0">1.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Excluded Pages</Label>
                <div className="flex gap-2">
                  <Input
                    value={newExcludedPage}
                    onChange={(e) => setNewExcludedPage(e.target.value)}
                    placeholder="/path/to/exclude"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExcludedPage())}
                  />
                  <Button onClick={addExcludedPage} type="button" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {seoData.excludedPages?.map((page, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 bg-muted text-muted-foreground hover:bg-muted/50">
                      {page}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-foreground"
                        onClick={() => removeExcludedPage(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card className="border">
            <CardHeader>
              <CardTitle>Analytics & Tracking</CardTitle>
              <CardDescription>
                Configure analytics and tracking services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={seoData.googleAnalyticsId}
                  onChange={(e) => setSeoData({ ...seoData, googleAnalyticsId: e.target.value })}
                  placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                <Input
                  id="googleTagManagerId"
                  value={seoData.googleTagManagerId}
                  onChange={(e) => setSeoData({ ...seoData, googleTagManagerId: e.target.value })}
                  placeholder="GTM-XXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  value={seoData.facebookPixelId}
                  onChange={(e) => setSeoData({ ...seoData, facebookPixelId: e.target.value })}
                  placeholder="XXXXXXXXXXXXXXXX"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotjarId">Hotjar ID</Label>
                  <Input
                    id="hotjarId"
                    value={seoData.hotjarId}
                    onChange={(e) => setSeoData({ ...seoData, hotjarId: e.target.value })}
                    placeholder="XXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clarityProjectId">Microsoft Clarity Project ID</Label>
                  <Input
                    id="clarityProjectId"
                    value={seoData.clarityProjectId}
                    onChange={(e) => setSeoData({ ...seoData, clarityProjectId: e.target.value })}
                    placeholder="XXXXXXXXXX"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Advanced */}
          <TabsContent value="advanced">
            <Card className="border">
            <CardHeader>
              <CardTitle>Advanced SEO Settings</CardTitle>
              <CardDescription>
                Advanced configuration and custom scripts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="structuredDataEnabled"
                    checked={seoData.structuredDataEnabled}
                    onCheckedChange={(checked) => setSeoData({ ...seoData, structuredDataEnabled: checked })}
                  />
                  <Label htmlFor="structuredDataEnabled">
                    Enable Structured Data
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="richSnippetsEnabled"
                    checked={seoData.richSnippetsEnabled}
                    onCheckedChange={(checked) => setSeoData({ ...seoData, richSnippetsEnabled: checked })}
                  />
                  <Label htmlFor="richSnippetsEnabled">
                    Enable Rich Snippets
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="breadcrumbsEnabled"
                    checked={seoData.breadcrumbsEnabled}
                    onCheckedChange={(checked) => setSeoData({ ...seoData, breadcrumbsEnabled: checked })}
                  />
                  <Label htmlFor="breadcrumbsEnabled">
                    Enable Breadcrumbs Schema
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="faqSchemaEnabled"
                    checked={seoData.faqSchemaEnabled}
                    onCheckedChange={(checked) => setSeoData({ ...seoData, faqSchemaEnabled: checked })}
                  />
                  <Label htmlFor="faqSchemaEnabled">
                    Enable FAQ Schema
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customHeadScripts">Custom Head Scripts</Label>
                <Textarea
                  id="customHeadScripts"
                  value={seoData.customHeadScripts}
                  onChange={(e) => setSeoData({ ...seoData, customHeadScripts: e.target.value })}
                  placeholder="Scripts to add before </head>"
                  rows={4}
                  className="font-mono text-sm bg-muted/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customBodyScripts">Custom Body Scripts</Label>
                <Textarea
                  id="customBodyScripts"
                  value={seoData.customBodyScripts}
                  onChange={(e) => setSeoData({ ...seoData, customBodyScripts: e.target.value })}
                  placeholder="Scripts to add before </body>"
                  rows={4}
                  className="font-mono text-sm bg-muted/50"
                />
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* International */}
          <TabsContent value="international">
            <Card className="border">
            <CardHeader>
              <CardTitle>International SEO</CardTitle>
              <CardDescription>
                Multi-language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Alternate Languages</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newLanguage.code}
                      onChange={(e) => setNewLanguage({ ...newLanguage, code: e.target.value })}
                      placeholder="Language code (e.g., en, ar, fr)"
                      className="w-1/3"
                    />
                    <Input
                      value={newLanguage.url}
                      onChange={(e) => setNewLanguage({ ...newLanguage, url: e.target.value })}
                      placeholder="URL for this language version"
                      className="flex-1"
                    />
                    <Button onClick={addLanguage} type="button" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {seoData.alternateLanguages?.map((lang, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded bg-card">
                        <span className="font-medium text-foreground">{lang.code}:</span>
                        <span className="flex-1 text-muted-foreground">{lang.url}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLanguage(index)}
                          className="hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Picker Modal */}
      <ImagePicker
        isOpen={galleryOpen}
        onClose={() => {
          setGalleryOpen(false);
          setImageTarget('');
        }}
        onSelect={handleImageSelect}
      />

      {/* Processing Overlay */}
      {saving && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-card rounded-lg p-6 shadow-xl border">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-lg font-medium text-foreground">Saving SEO settings...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}