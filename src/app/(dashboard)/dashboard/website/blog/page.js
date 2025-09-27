'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import '@/styles/tiptap.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TipTapEditor } from '@/components/ui/tiptap-editor';
import { ImagePicker } from '@/components/ui/image-picker';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  Tag,
  BookOpen,
  Save,
  X,
  ExternalLink,
  Clock,
  Star,
  Archive,
  FileText,
  Loader2,
  RefreshCw
} from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, archived: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searching, setSearching] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '', // HTML content from TipTap editor
    author: '',
    category: '',
    tags: [],
    featuredImage: '',
    readTime: '',
    isFeatured: false,
    status: 'DRAFT',
    publishedAt: '',
    scheduledPublishAt: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    canonicalUrl: '',
    allowComments: true,
    views: 0,
    relatedPosts: []
  });

  const blogCategories = [
    'Moving Tips',
    'Packing Guides',
    'Home Organization',
    'Storage Solutions',
    'Business Moving',
    'International Moving',
    'Real Estate',
    'Lifestyle',
    'Company News',
    'Customer Stories'
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts(true);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, categoryFilter]);

  const fetchPosts = async (showSearchLoader = false) => {
    try {
      if (showSearchLoader) setSearching(true);

      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);

      const response = await fetch(`/api/blog?${params}`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data);
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      if (showSearchLoader) setSearching(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '', // HTML content from TipTap editor
      author: '',
      category: '',
      tags: [],
      featuredImage: '',
      readTime: '',
      isFeatured: false,
      status: 'DRAFT',
      publishedAt: '',
      scheduledPublishAt: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [],
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      twitterTitle: '',
      twitterDescription: '',
      twitterImage: '',
      canonicalUrl: '',
      allowComments: true,
      viewCount: 0,
      likes: 0,
      relatedPosts: []
    });
    setEditingPost(null);
    setNewTag('');
    setNewKeyword('');
  };

  const openModal = (post = null) => {
    if (post) {
      console.log('Editing post:', post);
      setEditingPost(post);
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        author: post.author || '',
        category: post.category || '',
        tags: post.tags || [],
        featuredImage: post.featuredImage || '',
        readTime: post.readTime || '',
        isFeatured: post.isFeatured || false,
        status: post.status || 'DRAFT',
        publishedAt: post.publishedAt || '',
        scheduledPublishAt: post.scheduledPublishAt || '',
        metaTitle: post.metaTitle || '',
        metaDescription: post.metaDescription || '',
        metaKeywords: post.metaKeywords || [],
        ogTitle: post.ogTitle || '',
        ogDescription: post.ogDescription || '',
        ogImage: post.ogImage || '',
        twitterTitle: post.twitterTitle || '',
        twitterDescription: post.twitterDescription || '',
        twitterImage: post.twitterImage || '',
        canonicalUrl: post.canonicalUrl || '',
        allowComments: post.allowComments !== undefined ? post.allowComments : true,
        views: post.views || 0,
        relatedPosts: post.relatedPosts || []
      });
    } else {
      resetForm();
    }
    setShowModal(true);
    setNewTag('');
    setNewKeyword('');
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const generateSlug = (title) => {
    if (!title) return '';

    return title
      .toLowerCase()
      .trim()
      .normalize('NFD')                   // Normalize unicode characters
      .replace(/[\u0300-\u036f]/g, '')    // Remove diacritics/accents
      .replace(/[^\w\s-]/g, '')           // Remove all non-word chars except spaces and hyphens
      .replace(/\s+/g, '-')                // Replace one or more spaces with single hyphen
      .replace(/-+/g, '-')                // Ensure no multiple hyphens
      .replace(/^-+/, '')                 // Remove leading hyphens
      .replace(/-+$/, '');                // Remove trailing hyphens
  };

  const addTag = () => {
    const currentTags = formData.tags || [];
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...currentTags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((_, i) => i !== index)
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';

      // Filter form data to only include fields that exist in the database
      const dataToSubmit = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        tags: formData.tags,
        featuredImage: formData.featuredImage,
        readTime: formData.readTime,
        isFeatured: formData.isFeatured,
        status: formData.status,
        publishedAt: formData.publishedAt || null
      };

      console.log('Submitting to:', url, 'Method:', method);
      console.log('Data to submit:', dataToSubmit);

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (result.success) {
        await fetchPosts();
        closeModal();
       
      } else {
        alert(`Error: ${result.message || 'Failed to save blog post'}`);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('An error occurred while saving the blog post. Please check the console for details.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleImageSelect = (url) => {
    setFormData({ ...formData, featuredImage: url });
    setGalleryOpen(false);
  };

  const openDetailModal = (post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedPost(null);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (statusFilter !== 'all' && post.status.toLowerCase() !== statusFilter) {
        return false;
      }
      if (categoryFilter !== 'all' && post.category !== categoryFilter) {
        return false;
      }
      return true;
    });
  }, [posts, searchTerm, statusFilter, categoryFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-primary/10 text-primary border-primary/20';
      case 'DRAFT': return 'bg-muted text-muted-foreground border-muted';
      case 'ARCHIVED': return 'bg-muted/50 text-muted-foreground border-muted';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getContentPreview = (content) => {
    if (!content) return '';

    // If content is HTML, strip HTML tags and get plain text
    if (typeof content === 'string') {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      return textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');
    }

    // Legacy support for block-based content
    if (content.blocks) {
      const textBlocks = content.blocks
        .filter(block => ['paragraph', 'heading', 'quote'].includes(block.type))
        .slice(0, 2)
        .map(block => block.content || '')
        .join(' ');
      return textBlocks.slice(0, 150) + (textBlocks.length > 150 ? '...' : '');
    }

    return '';
  };


  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold">Blog Posts</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your blog content and articles
          </p>
        </div>
        <Button
          onClick={() => openModal()}
          disabled={processing || deleting}
          className="w-full sm:w-auto"
        >
          {processing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          <span className="sm:inline">New Post</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card p-3 sm:p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-7 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="bg-card p-3 sm:p-4 rounded-lg border relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-3 sm:p-4 rounded-lg border relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                  <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Published</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.published}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-3 sm:p-4 rounded-lg border relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-muted rounded-lg">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Drafts</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.draft}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-3 sm:p-4 rounded-lg border relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-muted rounded-lg">
                  <Archive className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Archived</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {searching || deleting ? <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin inline" /> : stats.archived}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-card p-3 sm:p-4 rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            {searching ? (
              <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-sm"
              disabled={searching}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter} disabled={searching || deleting}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter} disabled={searching || deleting}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {blogCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts Table/Cards */}
      <div className="bg-card rounded-lg border overflow-hidden relative">
        {searching && (
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Searching posts...</span>
            </div>
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Post</th>
                <th className="text-left p-4 font-medium text-foreground">Author</th>
                <th className="text-left p-4 font-medium text-foreground">Category</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-12 w-12 rounded" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-48 mb-2" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    <td className="p-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => openDetailModal(post)}
                >
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt=""
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">
                            {post.title}
                          </p>
                          {post.isFeatured && (
                            <Star className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {post.excerpt || getContentPreview(post.content)}
                        </p>
                        {post.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{post.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{post.author}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline">{post.category}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-foreground">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(post);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Skeleton className="h-16 w-16 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 hover:bg-muted/50 cursor-pointer"
                onClick={() => openDetailModal(post)}
              >
                <div className="flex items-start gap-3 mb-3">
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 truncate">
                          {post.title}
                        </p>
                        {post.isFeatured && (
                          <Star className="h-3 w-3 text-primary inline ml-1" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {post.excerpt || getContentPreview(post.content)}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <Badge className={`${getStatusColor(post.status)} text-xs`}>
                        {post.status}
                      </Badge>
                      {post.tags.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length} tags
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(post);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No blog posts found</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first blog post.</p>
            <Button onClick={() => openModal()} disabled={processing}>
              {processing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Create Post
            </Button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-full h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-20 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
              <Button variant="ghost" size="sm" onClick={closeModal} className="hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-4 sm:p-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="content" className="text-xs sm:text-sm">Content</TabsTrigger>
                  <TabsTrigger value="settings" className="text-xs sm:text-sm">Settings</TabsTrigger>
                  <TabsTrigger value="seo" className="text-xs sm:text-sm">SEO</TabsTrigger>
                  <TabsTrigger value="advanced" className="text-xs sm:text-sm">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          // Auto-generate slug from title if slug is empty or was previously auto-generated
                          const newSlug = !editingPost || !formData.slug || formData.slug === generateSlug(formData.title)
                            ? generateSlug(title)
                            : formData.slug;
                          setFormData({
                            ...formData,
                            title,
                            slug: newSlug
                          });
                        }}
                        placeholder="Post title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug (URL Path)</Label>
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => {
                              // Auto-format slug as user types
                              const formatted = e.target.value
                                .toLowerCase()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/\s+/g, '-')
                                .replace(/-+/g, '-');
                              setFormData({ ...formData, slug: formatted });
                            }}
                            onBlur={(e) => {
                              // Clean up slug on blur
                              const cleaned = generateSlug(e.target.value);
                              setFormData({ ...formData, slug: cleaned });
                            }}
                            placeholder="post-slug"
                            pattern="[a-z0-9-]+"
                            title="Only lowercase letters, numbers, and hyphens allowed"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newSlug = generateSlug(formData.title);
                              setFormData({ ...formData, slug: newSlug });
                            }}
                            title="Generate slug from title"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          URL: /blog/{formData.slug || 'post-slug'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description of the post"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <TipTapEditor
                      value={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      placeholder="Start writing your blog post..."
                    />
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author">Author *</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="Author name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {blogCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button onClick={addTag} type="button" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(formData.tags || []).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {tag}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeTag(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featuredImage">Featured Image</Label>
                    <div className="flex gap-2">
                      <Input
                        id="featuredImage"
                        value={formData.featuredImage}
                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                        placeholder="Image URL"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setGalleryOpen(true)}
                      >
                        Gallery
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={formData.readTime}
                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                        placeholder="5 min read"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                    />
                    <Label htmlFor="isFeatured">Featured Post</Label>
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4 mt-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">SEO Optimization</h4>
                    <p className="text-sm text-blue-700">Optimize your post for search engines and social media sharing.</p>
                  </div>

                  {/* Meta Tags */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 pb-2 border-b">Meta Tags</h4>

                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        placeholder={formData.title || "Enter meta title (60 characters max)"}
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-500">{(formData.metaTitle || '').length}/60 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        placeholder={formData.excerpt || "Enter meta description (160 characters max)"}
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-gray-500">{(formData.metaDescription || '').length}/160 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Meta Keywords</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                          placeholder="Add keyword"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const currentKeywords = formData.metaKeywords || [];
                              if (newKeyword.trim() && !currentKeywords.includes(newKeyword.trim())) {
                                setFormData({
                                  ...formData,
                                  metaKeywords: [...currentKeywords, newKeyword.trim()]
                                });
                                setNewKeyword('');
                              }
                            }
                          }}
                        />
                        <Button
                          onClick={() => {
                            const currentKeywords = formData.metaKeywords || [];
                            if (newKeyword.trim() && !currentKeywords.includes(newKeyword.trim())) {
                              setFormData({
                                ...formData,
                                metaKeywords: [...currentKeywords, newKeyword.trim()]
                              });
                              setNewKeyword('');
                            }
                          }}
                          type="button"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(formData.metaKeywords || []).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="gap-1">
                            {keyword}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => setFormData({
                                ...formData,
                                metaKeywords: (formData.metaKeywords || []).filter((_, i) => i !== index)
                              })}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Open Graph */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 pb-2 border-b">Open Graph (Facebook/LinkedIn)</h4>

                    <div className="space-y-2">
                      <Label htmlFor="ogTitle">OG Title</Label>
                      <Input
                        id="ogTitle"
                        value={formData.ogTitle}
                        onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                        placeholder={formData.title || "Enter Open Graph title"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ogDescription">OG Description</Label>
                      <Textarea
                        id="ogDescription"
                        value={formData.ogDescription}
                        onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                        placeholder={formData.excerpt || "Enter Open Graph description"}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ogImage">OG Image</Label>
                      <div className="flex gap-2">
                        <Input
                          id="ogImage"
                          value={formData.ogImage}
                          onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                          placeholder={formData.featuredImage || "Open Graph image URL"}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setGalleryOpen(true)}
                        >
                          Gallery
                        </Button>
                      </div>
                      {formData.ogImage && (
                        <img src={formData.ogImage} alt="OG Preview" className="w-full h-32 object-cover rounded mt-2" />
                      )}
                    </div>
                  </div>

                  {/* Twitter Card */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 pb-2 border-b">Twitter Card</h4>

                    <div className="space-y-2">
                      <Label htmlFor="twitterTitle">Twitter Title</Label>
                      <Input
                        id="twitterTitle"
                        value={formData.twitterTitle}
                        onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })}
                        placeholder={formData.title || "Enter Twitter card title"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitterDescription">Twitter Description</Label>
                      <Textarea
                        id="twitterDescription"
                        value={formData.twitterDescription}
                        onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })}
                        placeholder={formData.excerpt || "Enter Twitter card description"}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitterImage">Twitter Image</Label>
                      <div className="flex gap-2">
                        <Input
                          id="twitterImage"
                          value={formData.twitterImage}
                          onChange={(e) => setFormData({ ...formData, twitterImage: e.target.value })}
                          placeholder={formData.featuredImage || "Twitter card image URL"}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setGalleryOpen(true)}
                        >
                          Gallery
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Canonical URL */}
                  <div className="space-y-2">
                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                    <Input
                      id="canonicalUrl"
                      value={formData.canonicalUrl}
                      onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                      placeholder="https://example.com/blog/post-slug"
                    />
                    <p className="text-xs text-gray-500">Specify the preferred URL for this content to avoid duplicate content issues.</p>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 mt-4">
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-purple-900 mb-2">Advanced Settings</h4>
                    <p className="text-sm text-purple-700">Configure publishing options and engagement settings.</p>
                  </div>

                  {/* Publishing Options */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 pb-2 border-b">Publishing Options</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="publishedAt">Publish Date</Label>
                        <Input
                          id="publishedAt"
                          type="datetime-local"
                          value={formData.publishedAt}
                          onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="scheduledPublishAt">Schedule Publishing</Label>
                        <Input
                          id="scheduledPublishAt"
                          type="datetime-local"
                          value={formData.scheduledPublishAt}
                          onChange={(e) => setFormData({ ...formData, scheduledPublishAt: e.target.value })}
                        />
                        {formData.scheduledPublishAt && (
                          <p className="text-xs text-blue-600">
                            <Clock className="h-3 w-3 inline mr-1" />
                            Will be published on {new Date(formData.scheduledPublishAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Engagement Settings */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 pb-2 border-b">Engagement Settings</h4>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowComments"
                        checked={formData.allowComments}
                        onCheckedChange={(checked) => setFormData({ ...formData, allowComments: checked })}
                      />
                      <Label htmlFor="allowComments">Allow Comments</Label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>View Count</Label>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">{formData.views || 0} views</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Related Posts */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 pb-2 border-b">Related Posts</h4>

                    <div className="space-y-2">
                      <Label>Select Related Posts</Label>
                      <Select
                        onValueChange={(value) => {
                          if (value && !formData.relatedPosts.includes(value)) {
                            setFormData({
                              ...formData,
                              relatedPosts: [...formData.relatedPosts, value]
                            });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose related posts" />
                        </SelectTrigger>
                        <SelectContent>
                          {posts
                            .filter(p => p.id !== editingPost?.id && !formData.relatedPosts.includes(p.id))
                            .map(post => (
                              <SelectItem key={post.id} value={post.id}>
                                {post.title}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <div className="space-y-2 mt-2">
                        {(formData.relatedPosts || []).map((postId, index) => {
                          const relatedPost = posts.find(p => p.id === postId);
                          return relatedPost ? (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">{relatedPost.title}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setFormData({
                                  ...formData,
                                  relatedPosts: (formData.relatedPosts || []).filter((_, i) => i !== index)
                                })}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Content Statistics */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 pb-2 border-b">Content Statistics</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Word Count</p>
                        <p className="text-lg font-medium">
                          {(() => {
                            if (typeof formData.content === 'string') {
                              const tempDiv = document.createElement('div');
                              tempDiv.innerHTML = formData.content;
                              const text = tempDiv.textContent || tempDiv.innerText || '';
                              return text.trim().split(/\s+/).filter(word => word.length > 0).length;
                            }
                            // Legacy support for block-based content
                            if (formData.content?.blocks) {
                              return formData.content.blocks.reduce((count, block) => {
                                if (block.content && typeof block.content === 'string') {
                                  return count + block.content.split(/\s+/).length;
                                }
                                return count;
                              }, 0);
                            }
                            return 0;
                          })()}
                        </p>
                      </div>

                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Character Count</p>
                        <p className="text-lg font-medium">
                          {(() => {
                            if (typeof formData.content === 'string') {
                              const tempDiv = document.createElement('div');
                              tempDiv.innerHTML = formData.content;
                              const text = tempDiv.textContent || tempDiv.innerText || '';
                              return text.length;
                            }
                            // Legacy support for block-based content
                            if (formData.content?.blocks) {
                              return formData.content.blocks.reduce((count, block) => {
                                if (block.content && typeof block.content === 'string') {
                                  return count + block.content.length;
                                }
                                return count;
                              }, 0);
                            }
                            return 0;
                          })()}
                        </p>
                      </div>

                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Estimated Read Time</p>
                        <p className="text-lg font-medium">
                          {Math.max(1, Math.ceil((() => {
                            let wordCount = 0;
                            if (typeof formData.content === 'string') {
                              const tempDiv = document.createElement('div');
                              tempDiv.innerHTML = formData.content;
                              const text = tempDiv.textContent || tempDiv.innerText || '';
                              wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
                            } else if (formData.content?.blocks) {
                              wordCount = formData.content.blocks.reduce((count, block) => {
                                if (block.content && typeof block.content === 'string') {
                                  return count + block.content.split(/\s+/).length;
                                }
                                return count;
                              }, 0);
                            }
                            return wordCount;
                          })() / 200))} min
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button type="button" variant="outline" onClick={closeModal} disabled={processing}>
                  Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {processing ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Full Width */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-full h-full overflow-hidden flex flex-col">
            {/* Sticky Modal Header */}
            <div className="sticky top-0 bg-white border-b shadow-sm z-20 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 gap-2 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold">{selectedPost.title}</h2>
                  <Badge className={getStatusColor(selectedPost.status)}>
                    {selectedPost.status}
                  </Badge>
                  {selectedPost.isFeatured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      closeDetailModal();
                      openModal(selectedPost);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={closeDetailModal}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="col-span-2 space-y-6">
                  {/* Featured Image */}
                  {selectedPost.featuredImage && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={selectedPost.featuredImage}
                        alt={selectedPost.title}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  )}

                  {/* Excerpt */}
                  {selectedPost.excerpt && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Excerpt</h3>
                      <p className="text-gray-600">{selectedPost.excerpt}</p>
                    </div>
                  )}

                  {/* Content */}
                  <div className="w-full">
                    <h3 className="text-lg font-semibold mb-4">Content</h3>
                    {selectedPost.content ? (
                      typeof selectedPost.content === 'string' ? (
                        <div
                          className="modal-content-display prose prose-lg max-w-none
                            prose-headings:font-bold prose-headings:text-gray-900
                            prose-h1:text-4xl prose-h1:mt-6 prose-h1:mb-4
                            prose-h2:text-3xl prose-h2:mt-5 prose-h2:mb-3
                            prose-h3:text-2xl prose-h3:mt-4 prose-h3:mb-2
                            prose-p:text-base prose-p:text-gray-700 prose-p:my-3
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-3
                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-3
                            prose-li:my-1 prose-li:text-gray-700
                            prose-strong:font-bold prose-strong:text-gray-900
                            prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                            prose-blockquote:border-l-4 prose-blockquote:border-gray-300
                            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                            prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1
                            prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4
                            prose-pre:rounded-lg prose-pre:overflow-x-auto
                            prose-img:rounded-lg prose-img:max-w-full prose-img:h-auto
                            prose-hr:border-gray-300 prose-hr:my-8"
                          dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                        />
                      ) : selectedPost.content.blocks ? (
                        // Legacy support for block-based content
                        <div className="space-y-4">
                          {selectedPost.content.blocks.map((block, index) => {
                            switch (block.type) {
                              case 'heading':
                                return (
                                  <h3 key={index} className="text-xl font-semibold">
                                    {block.content}
                                  </h3>
                                );
                              case 'paragraph':
                                return (
                                  <p key={index} className="text-gray-700 leading-relaxed">
                                    {block.content}
                                  </p>
                                );
                              case 'list':
                                return (
                                  <ul key={index} className="list-disc pl-5 space-y-1">
                                    {block.items?.map((item, i) => (
                                      <li key={i} className="text-gray-700">{item}</li>
                                    ))}
                                  </ul>
                                );
                              case 'quote':
                                return (
                                  <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                                    {block.content}
                                  </blockquote>
                                );
                              case 'code':
                                return (
                                  <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    <code>{block.content}</code>
                                  </pre>
                                );
                              case 'image':
                                return (
                                  <img
                                    key={index}
                                    src={block.url}
                                    alt={block.caption || ''}
                                    className="w-full rounded-lg"
                                  />
                                );
                              default:
                                return null;
                            }
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No content available</p>
                      )
                    ) : (
                      <p className="text-gray-500 italic">No content available</p>
                    )}
                  </div>

                  {/* SEO Information */}
                  {(selectedPost.metaTitle || selectedPost.metaDescription || selectedPost.metaKeywords?.length > 0) && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4">SEO Information</h3>
                      <div className="space-y-3">
                        {selectedPost.metaTitle && (
                          <div>
                            <p className="text-sm font-medium text-gray-600">Meta Title</p>
                            <p className="text-gray-800">{selectedPost.metaTitle}</p>
                          </div>
                        )}
                        {selectedPost.metaDescription && (
                          <div>
                            <p className="text-sm font-medium text-gray-600">Meta Description</p>
                            <p className="text-gray-800">{selectedPost.metaDescription}</p>
                          </div>
                        )}
                        {selectedPost.metaKeywords?.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">Meta Keywords</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedPost.metaKeywords.map((keyword, index) => (
                                <Badge key={index} variant="secondary">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Post Information */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold text-gray-900">Post Information</h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Author:</span>
                        <span className="font-medium">{selectedPost.author}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{selectedPost.category}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Published:</span>
                        <span className="font-medium">
                          {new Date(selectedPost.publishedAt || selectedPost.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Read Time:</span>
                        <span className="font-medium">{selectedPost.readTime || 'N/A'}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Views:</span>
                        <span className="font-medium">{selectedPost.views || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedPost.tags?.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* URL Information */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900">URL Information</h3>

                    {selectedPost.slug && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Slug</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-white px-2 py-1 rounded border flex-1 truncate">
                            {selectedPost.slug}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(selectedPost.slug)}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {selectedPost.canonicalUrl && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Canonical URL</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-white px-2 py-1 rounded border flex-1 truncate">
                            {selectedPost.canonicalUrl}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(selectedPost.canonicalUrl, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Engagement Settings */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Engagement</h3>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="detail-comments"
                        checked={selectedPost.allowComments}
                        disabled
                      />
                      <Label htmlFor="detail-comments" className="text-sm">
                        Comments {selectedPost.allowComments ? 'Enabled' : 'Disabled'}
                      </Label>
                    </div>
                  </div>

                  {/* Related Posts */}
                  {selectedPost.relatedPosts?.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Related Posts</h3>
                      <div className="space-y-2">
                        {selectedPost.relatedPosts.map((postId, index) => {
                          const relatedPost = posts.find(p => p.id === postId);
                          return relatedPost ? (
                            <div
                              key={index}
                              className="p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer"
                              onClick={() => {
                                closeDetailModal();
                                setTimeout(() => openDetailModal(relatedPost), 100);
                              }}
                            >
                              <p className="text-sm font-medium truncate">{relatedPost.title}</p>
                              <p className="text-xs text-gray-500">{relatedPost.category}</p>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Image Picker Modal */}
      {galleryOpen && (
        <ImagePicker
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
          onSelect={handleImageSelect}
        />
      )}

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[50000]">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg">
                {editingPost ? 'Updating post...' : 'Creating post...'}
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
              <span className="text-lg">Deleting post...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}