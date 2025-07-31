import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { PenTool, Home, BookOpen } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const location = useLocation()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/blog", label: "Blog", icon: BookOpen },
    { path: "/admin", label: "Admin", icon: PenTool },
  ]

  const handleLinkHover = (path: string) => {
    setHoveredPath(path)
    // Prefetch the route by creating a link element
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = path
    document.head.appendChild(link)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-lg blog-gradient flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ModernBlog
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              const isHovered = hoveredPath === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => handleLinkHover(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : isHovered
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button 
            asChild 
            variant="default" 
            size="sm"
            className="hidden sm:inline-flex blog-gradient hover:opacity-90 transition-opacity"
          >
            <Link to="/admin">Write Post</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}