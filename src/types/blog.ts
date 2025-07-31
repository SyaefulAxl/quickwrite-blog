export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  readTime: number
  featured: boolean
  published: boolean
}

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
}