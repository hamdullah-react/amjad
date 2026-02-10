'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImagePicker } from '@/components/ui/image-picker';
import { Save, Plus, Search, Globe, Edit, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PREDEFINED_PAGES = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'services-area', label: 'Services Area' },
  { key: 'contact', label: 'Contact' },
  { key: 'blog', label: 'Blog' },
  { key: 'why-choose-us', label: 'Why Choose Us' },
];

const DEFAULT_PAGE_SEO = {
  title: '',
  description: '',
  keywords: '',
  canonical: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
};

export default function PageSEOPage() {
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [imageTargetPage, setImageTargetPage] = useState('');

  const showFeedback = (type, message) => {
    setFeedback({ type, message })
    setTimeout(() => setFeedback(null), 4000)
  }

  useEffect(() => {
    fetchPageSEO();
  }, []);

  const fetchPageSEO = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/page-seo');
      const result = await response.json();

      if (result.success) {
        const dataMap = {};
        // Initialize all predefined pages with defaults
        PREDEFINED_PAGES.forEach((p) => {
          dataMap[p.key] = { ...DEFAULT_PAGE_SEO };
        });
        // Overlay fetched data
        result.data.forEach((item) => {
          dataMap[item.page] = {
            id: item.id,
            title: item.title || '',
            description: item.description || '',
            keywords: item.keywords || '',
            canonical: item.canonical || '',
            ogTitle: item.ogTitle || '',
            ogDescription: item.ogDescription || '',
            ogImage: item.ogImage || '',
          };
        });
        setPageData(dataMap);
      }
    } catch (error) {
      console.error('Error fetching page SEO data:', error);
      showFeedback('error', 'Failed to load page SEO data.');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (pageKey, field, value) => {
    setPageData((prev) => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [field]: value,
      },
    }));
  };

  const handleSave = async (pageKey) => {
    setSavingPage(pageKey);
    try {
      const data = pageData[pageKey];
      const response = await fetch('/api/page-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: pageKey,
          title: data.title,
          description: data.description,
          keywords: data.keywords,
          canonical: data.canonical,
          ogTitle: data.ogTitle,
          ogDescription: data.ogDescription,
          ogImage: data.ogImage,
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Update the local state with the returned data (e.g. new id)
        if (result.data) {
          setPageData((prev) => ({
            ...prev,
            [pageKey]: {
              ...prev[pageKey],
              id: result.data.id,
            },
          }));
        }
        showFeedback('success', result.message || `SEO settings for "${pageKey}" saved successfully.`);
      } else {
        showFeedback('error', result.message || `Failed to save SEO settings for "${pageKey}".`);
      }
    } catch (error) {
      console.error('Error saving page SEO:', error);
      showFeedback('error', `Error saving SEO settings for "${pageKey}".`);
    } finally {
      setSavingPage(null);
    }
  };

  const handleImageSelect = (url) => {
    if (imageTargetPage) {
      handleFieldChange(imageTargetPage, 'ogImage', url);
    }
    setGalleryOpen(false);
    setImageTargetPage('');
  };

  const openGallery = (pageKey) => {
    setImageTargetPage(pageKey);
    setGalleryOpen(true);
  };

  const filteredPages = PREDEFINED_PAGES.filter((p) =>
    p.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Page SEO Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage individual SEO meta tags for each page on your website
        </p>
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

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-lg shadow p-4 border">
          <div className="text-sm text-muted-foreground">Total Pages</div>
          <div className="text-2xl font-bold text-primary">{PREDEFINED_PAGES.length}</div>
        </div>
        <div className="bg-card rounded-lg shadow p-4 border">
          <div className="text-sm text-muted-foreground">Configured</div>
          <div className="text-2xl font-bold text-primary">
            {Object.values(pageData).filter((d) => d.id).length}
          </div>
        </div>
        <div className="bg-card rounded-lg shadow p-4 border">
          <div className="text-sm text-muted-foreground">Not Configured</div>
          <div className="text-2xl font-bold text-muted-foreground">
            {PREDEFINED_PAGES.length - Object.values(pageData).filter((d) => d.id).length}
          </div>
        </div>
        <div className="bg-card rounded-lg shadow p-4 border">
          <div className="text-sm text-muted-foreground">Completion</div>
          <div className="text-2xl font-bold text-primary">
            {PREDEFINED_PAGES.length > 0 ? Math.round((Object.values(pageData).filter((d) => d.id).length / PREDEFINED_PAGES.length) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Page Cards */}
      <div className="space-y-6">
        {filteredPages.map((page) => {
          const data = pageData[page.key] || { ...DEFAULT_PAGE_SEO };
          const isSaving = savingPage === page.key;
          const isConfigured = !!data.id;

          return (
            <Card key={page.key} className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{page.label}</CardTitle>
                      <CardDescription>/{page.key === 'home' ? '' : page.key}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isConfigured
                          ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
                      }`}
                    >
                      {isConfigured ? 'Configured' : 'Not Configured'}
                    </span>
                    <Button
                      onClick={() => handleSave(page.key)}
                      disabled={isSaving}
                      size="sm"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Page Name (read-only) */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Page Name</Label>
                  <Input
                    value={page.label}
                    readOnly
                    className="bg-muted/50 cursor-not-allowed"
                  />
                </div>

                {/* Title & Keywords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${page.key}`}>Title</Label>
                    <Input
                      id={`title-${page.key}`}
                      value={data.title}
                      onChange={(e) => handleFieldChange(page.key, 'title', e.target.value)}
                      placeholder={`SEO title for ${page.label} page`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`keywords-${page.key}`}>Keywords</Label>
                    <Input
                      id={`keywords-${page.key}`}
                      value={data.keywords}
                      onChange={(e) => handleFieldChange(page.key, 'keywords', e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor={`description-${page.key}`}>Description</Label>
                  <Textarea
                    id={`description-${page.key}`}
                    value={data.description}
                    onChange={(e) => handleFieldChange(page.key, 'description', e.target.value)}
                    placeholder={`Meta description for ${page.label} page`}
                    rows={3}
                  />
                </div>

                {/* Canonical URL */}
                <div className="space-y-2">
                  <Label htmlFor={`canonical-${page.key}`}>Canonical URL</Label>
                  <Input
                    id={`canonical-${page.key}`}
                    value={data.canonical}
                    onChange={(e) => handleFieldChange(page.key, 'canonical', e.target.value)}
                    placeholder="https://yourwebsite.com/page"
                  />
                </div>

                {/* OG Title & OG Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ogTitle-${page.key}`}>OG Title</Label>
                    <Input
                      id={`ogTitle-${page.key}`}
                      value={data.ogTitle}
                      onChange={(e) => handleFieldChange(page.key, 'ogTitle', e.target.value)}
                      placeholder="Open Graph title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`ogDescription-${page.key}`}>OG Description</Label>
                    <Textarea
                      id={`ogDescription-${page.key}`}
                      value={data.ogDescription}
                      onChange={(e) => handleFieldChange(page.key, 'ogDescription', e.target.value)}
                      placeholder="Open Graph description"
                      rows={2}
                    />
                  </div>
                </div>

                {/* OG Image */}
                <div className="space-y-2">
                  <Label htmlFor={`ogImage-${page.key}`}>OG Image</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`ogImage-${page.key}`}
                      value={data.ogImage}
                      onChange={(e) => handleFieldChange(page.key, 'ogImage', e.target.value)}
                      placeholder="Image URL for social sharing"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => openGallery(page.key)}
                    >
                      Gallery
                    </Button>
                  </div>
                  {data.ogImage && (
                    <div className="mt-2">
                      <img
                        src={data.ogImage}
                        alt={`OG Image for ${page.label}`}
                        className="h-20 w-auto rounded border object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No pages found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search term.</p>
        </div>
      )}

      {/* Image Picker Modal */}
      <ImagePicker
        isOpen={galleryOpen}
        onClose={() => {
          setGalleryOpen(false);
          setImageTargetPage('');
        }}
        onSelect={handleImageSelect}
      />

      {/* Saving Overlay */}
      {savingPage && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-card rounded-lg p-6 shadow-xl border">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-lg font-medium text-foreground">
                Saving SEO settings for {PREDEFINED_PAGES.find((p) => p.key === savingPage)?.label || savingPage}...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
