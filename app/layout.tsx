import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pack de Recibidas',
  description: 'Creá tu placa de recibida personalizada',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
