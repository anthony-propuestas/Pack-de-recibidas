import Hero from '@/components/home/Hero'
import Gallery from '@/components/home/Gallery'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonials from '@/components/home/Testimonials'
import CallToAction from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <footer className="bg-white border-t border-rose-100 text-slate-400 text-center py-5 text-xs">
        © {new Date().getFullYear()} Pack de Recibidas — Todos los derechos reservados
      </footer>
    </main>
  )
}
