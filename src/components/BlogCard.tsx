import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import { BlogPost } from "@/types/blog"

interface BlogCardProps {
  post: BlogPost
  searchTerm?: string
}

export function BlogCard({ post, searchTerm }: BlogCardProps) {
  const highlightText = (text: string, highlight?: string) => {
    if (!highlight || !highlight.trim()) return text
    
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="search-highlight">{part}</span> : 
        part
    )
  }

  const handleMouseEnter = () => {
    // Prefetch the blog post route
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = `/blog/${post.slug}`
    document.head.appendChild(link)
  }

  return (
    <Card 
      className="blog-card-hover group cursor-pointer h-full"
      onMouseEnter={handleMouseEnter}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <div className="flex items-center text-xs text-blog-meta">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </div>
          
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {highlightText(post.title, searchTerm)}
          </h3>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {highlightText(post.excerpt, searchTerm)}
          </p>
          
          <div className="flex items-center justify-between text-sm text-blog-meta">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}