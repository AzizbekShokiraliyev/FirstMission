import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react" // Ikonkalar uchun

const HeroLanding = () => {
  return (
    <section className="pt-44 ">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
          Dasturlash dunyosini <br />
          <span className="text-primary">ProDev</span> bilan kashf eting
        </h1>
        <p className="mx-auto max-w-[700px] text-lg mb-10">
          Sizning professional o'sishingiz uchun mo'ljallangan eng zamonaviy platforma. 
          Loyiha boshqaruvidan tortib, jamoaviy hamkorlikkacha — hammasi bir joyda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-12 px-8 rounded-full" asChild>
            <Link to="/register">
              Bepul boshlash
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base font-semibold" asChild>
            <Link to="/demo">
              Demo ko'rish
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroLanding