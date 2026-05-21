import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HeaderLanding = () => {

  return (
    <header className={cn("top-0 left-0 right-0 py-5")}>
      <div className="container mx-auto flex items-center justify-between ">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold">ProDev</span>
        </Link>


        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="lg" 
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
          
          <Button size="lg" className="rounded-full sm:px-12 sm:py-5 font-semibold" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default HeaderLanding