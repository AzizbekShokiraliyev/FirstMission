import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HeaderLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
            <span className="text-primary-foreground font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight">ProDev</span>
        </Link>


        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm font-medium transition-colors hover:text-primary sm:px-8 sm:py-5"
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
          
          <Button 
            size="sm" 
            className="rounded-full px-5 sm:px-12 sm:py-5 font-semibold shadow-md hover:shadow-primary/25 transition-all active:scale-95" 
            asChild
          >
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default HeaderLanding