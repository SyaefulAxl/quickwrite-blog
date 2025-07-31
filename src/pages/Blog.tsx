import { useState, useEffect } from "react"
import { SearchBar } from "@/components/SearchBar"
import { BlogCard } from "@/components/BlogCard"
import { Pagination } from "@/components/Pagination"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/types/blog"

// Mock data - replace with actual API calls
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Modern Web Development",
    slug: "getting-started-modern-web-development",
    excerpt: "Learn the fundamentals of modern web development with React, TypeScript, and the latest tools that will make you a more productive developer.",
    content: "# Getting Started with Modern Web Development\n\nModern web development has evolved significantly...",
    author: "John Doe",
    category: "Web Development",
    tags: ["React", "TypeScript", "Tutorial"],
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-15",
    readTime: 8,
    featured: true,
    published: true
  },
  {
    id: "2",
    title: "The Power of TypeScript in Large Applications",
    slug: "power-of-typescript-large-applications",
    excerpt: "Discover how TypeScript can improve your development experience and help you build more maintainable applications at scale.",
    content: "# The Power of TypeScript\n\nTypeScript has become essential...",
    author: "Jane Smith",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    publishedAt: "2024-01-12",
    updatedAt: "2024-01-12",
    readTime: 12,
    featured: false,
    published: true
  },
  {
    id: "3",
    title: "Building Responsive UIs with Tailwind CSS",
    slug: "building-responsive-uis-tailwind-css",
    excerpt: "Master the art of creating beautiful, responsive user interfaces using Tailwind CSS utility classes and design system principles.",
    content: "# Building Responsive UIs\n\nTailwind CSS revolutionizes...",
    author: "Mike Johnson",
    category: "Design",
    tags: ["Tailwind CSS", "UI/UX", "Responsive Design"],
    publishedAt: "2024-01-10",
    updatedAt: "2024-01-10",
    readTime: 6,
    featured: false,
    published: true
  },
  {
    id: "4",
    title: "Advanced React Patterns and Performance",
    slug: "advanced-react-patterns-performance",
    excerpt: "Explore advanced React patterns, hooks, and performance optimization techniques to build lightning-fast applications.",
    content: "# Advanced React Patterns\n\nReact performance optimization...",
    author: "Sarah Wilson",
    category: "React",
    tags: ["React", "Performance", "Hooks"],
    publishedAt: "2024-01-08",
    updatedAt: "2024-01-08",
    readTime: 15,
    featured: true,
    published: true
  },
  {
    id: "5",
    title: "State Management in Modern React Apps",
    slug: "state-management-modern-react-apps",
    excerpt: "Compare different state management solutions for React applications and learn when to use each approach.",
    content: "# State Management\n\nChoosing the right state management...",
    author: "David Brown",
    category: "React",
    tags: ["React", "State Management", "Zustand"],
    publishedAt: "2024-01-05",
    updatedAt: "2024-01-05",
    readTime: 10,
    featured: false,
    published: true
  }
]

const POSTS_PER_PAGE = 3

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(mockPosts)

  const categories = Array.from(new Set(mockPosts.map(post => post.category)))

  useEffect(() => {
    let filtered = mockPosts

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedCategory])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, tutorials, and thoughts on modern web development and technology.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search articles, tags, or content..."
            className="max-w-2xl mx-auto"
          />
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedCategory === null ? "blog-gradient text-white" : "hover:bg-muted"
              }`}
              onClick={() => handleCategoryFilter(null)}
            >
              All Categories
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedCategory === category ? "blog-gradient text-white" : "hover:bg-muted"
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-center text-muted-foreground">
          {searchTerm && (
            <p>
              Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} 
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in "${selectedCategory}"`}
            </p>
          )}
        </div>

        {/* Blog Posts Grid */}
        {paginatedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {paginatedPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                searchTerm={searchTerm}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <SearchBar className="w-8 h-8 text-muted-foreground" onSearch={() => {}} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory(null)
              }}
              className="text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}