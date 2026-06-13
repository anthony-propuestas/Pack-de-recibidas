import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pack de Recibidas',
  description: 'Creá tu placa de recibida personalizada',
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
      <body className="min-h-screen bg-white">
        <nav className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/home" className="text-xl font-bold text-rose-500">
              🎓 Pack de Recibidas
            </a>
            <div className="flex gap-6">
              <a href="/home" className="text-gray-600 hover:text-rose-500 transition-colors">
                Inicio
              </a>
              <a
                href="/placa-de-recibida"
                className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-rose-600 transition-colors"
              >
                Crear Placa
              </a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
