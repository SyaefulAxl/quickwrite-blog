import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { PlusCircle, Save, Eye, Trash2, Edit } from "lucide-react"
import { BlogPostFormData, BlogPost } from "@/types/blog"
import { useToast } from "@/hooks/use-toast"

// Mock existing posts
const mockExistingPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Modern Web Development",
    slug: "getting-started-modern-web-development",
    excerpt: "Learn the fundamentals of modern web development...",
    content: "# Getting Started\n\nContent here...",
    author: "John Doe",
    category: "Web Development",
    tags: ["React", "TypeScript"],
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: 8,
    featured: true,
    published: true
  }
]

export default function Admin() {
  const { toast } = useToast()
  const [posts, setPosts] = useState<BlogPost[]>(mockExistingPosts)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: [],
    featured: false,
    published: true
  })

  const categories = ["Web Development", "Programming", "Design", "React", "TypeScript"]

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.author) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const slug = formData.slug || generateSlug(formData.title)
    const readTime = calculateReadTime(formData.content)

    if (isEditing && editingId) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingId 
          ? {
              ...post,
              ...formData,
              slug,
              readTime,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : post
      ))
      toast({
        title: "Success",
        description: "Post updated successfully!",
        variant: "default"
      })
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
        slug,
        readTime,
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      setPosts([newPost, ...posts])
      toast({
        title: "Success",
        description: "Post created successfully!",
        variant: "default"
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      tags: [],
      featured: false,
      published: true
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      published: post.published
    })
    setIsEditing(true)
    setEditingId(post.id)
  }

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
    toast({
      title: "Success",
      description: "Post deleted successfully!",
      variant: "default"
    })
  }

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag)
    setFormData({ ...formData, tags })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Blog Admin
          </h1>
          <p className="text-xl text-muted-foreground">
            Create and manage your blog posts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="blog-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                {isEditing ? "Edit Post" : "Create New Post"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setFormData({ 
                        ...formData, 
                        title,
                        slug: formData.slug || generateSlug(title)
                      })
                    }}
                    placeholder="Enter post title..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="React, TypeScript, Tutorial"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content (MDX) *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="# Your Post Title

Write your content here using Markdown/MDX syntax...

## Section Title

Your content with **bold** and *italic* text."
                    rows={10}
                    required
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" variant="gradient" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? "Update Post" : "Create Post"}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts List Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Existing Posts ({posts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No posts yet. Create your first post!
                    </p>
                  ) : (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold line-clamp-1">{post.title}</h3>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.publishedAt}</span>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          {post.featured && (
                            <Badge variant="outline">Featured</Badge>
                          )}
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}