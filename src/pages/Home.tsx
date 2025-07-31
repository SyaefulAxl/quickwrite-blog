import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, Edit, Search, Zap } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Beautiful Blog Posts",
      description: "Write and publish stunning blog posts with MDX support and rich formatting."
    },
    {
      icon: Search,
      title: "Real-time Search",
      description: "Find content instantly with our powerful search that works as you type."
    },
    {
      icon: Edit,
      title: "Easy Content Management",
      description: "Create, edit, and manage your blog posts with our intuitive admin interface."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with aggressive caching and link prefetching."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 blog-gradient opacity-5"></div>
        <div className="container relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Welcome to ModernBlog
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              A beautiful, fast, and modern blog platform built with React, TypeScript, and Tailwind CSS.
              Share your thoughts with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="blog-gradient hover:opacity-90 transition-opacity text-lg px-8">
                <Link to="/blog">
                  Explore Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-2">
                <Link to="/admin">Start Writing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything you need for blogging
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern features designed to make content creation and consumption delightful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="blog-card-hover border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg blog-gradient flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-8 lg:p-12 rounded-2xl blog-gradient">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to start writing?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Join thousands of writers who trust our platform to share their stories with the world.
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link to="/admin">
                  Create Your First Post
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}