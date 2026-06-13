import type { Metadata } from 'next'
import './globals.css'
import WhatsAppButton from '@/components/home/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Pack de Recibidas — Placas de egreso personalizadas',
  description:
    'Creá tu placa de recibida personalizada en minutos. Elegí tu carrera, personalizá con tu nombre y descargá en alta resolución para imprimir.',
  keywords: ['placa de recibida', 'egresados', 'graduación', 'marcos personalizados', 'Argentina'],
  openGraph: {
    title: 'Pack de Recibidas',
    description: 'Placas de egreso personalizadas para tu graduación. Preview en tiempo real, descarga en alta resolución.',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Dancing+Script:wght@400;700&family=Lobster&family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Oswald:wght@400;700&family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#09090f] text-zinc-100">
        <nav className="bg-[#09090f]/90 backdrop-blur-md border-b border-white/[0.06] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a
              href="/home"
              className="text-lg font-bold text-rose-500 tracking-wide uppercase"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              🎓 Pack de Recibidas
            </a>
            <div className="flex gap-5 items-center">
              <a href="/home" className="text-sm text-zinc-400 hover:text-rose-400 transition-colors">
                Inicio
              </a>
              <a
                href="/placa-de-recibida"
                className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
              >
                Crear Placa
              </a>
            </div>
          </div>
        </nav>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
