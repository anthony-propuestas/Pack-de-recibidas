import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import CallToAction from '@/components/home/CallToAction'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <CallToAction />
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} Pack de Recibidas — Todos los derechos reservados
      </footer>
    </main>
  )
}
