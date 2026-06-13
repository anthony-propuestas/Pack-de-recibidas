'use client'

import { useState } from 'react'

interface DesignItem {
  key: string
  name: string
  date: string
  uploaded: string
}

type ViewState = 'login' | 'loading' | 'gallery' | 'error'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [view, setView] = useState<ViewState>('login')
  const [items, setItems] = useState<DesignItem[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [sessionPwd, setSessionPwd] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setView('loading')

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.status === 401) {
        setErrorMsg('Contraseña incorrecta.')
        setView('error')
        return
      }
      if (!res.ok) {
        setErrorMsg('Error del servidor.')
        setView('error')
        return
      }

      const data = await res.json() as { items: DesignItem[] }
      setItems(data.items)
      setSessionPwd(password)
      setView('gallery')
    } catch {
      setErrorMsg('Error de conexión.')
      setView('error')
    }
  }

  function imageUrl(key: string) {
    return `/api/admin-image?key=${encodeURIComponent(key)}&password=${encodeURIComponent(sessionPwd)}`
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-[#111118] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-zinc-100 mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Panel Admin
          </h1>
          <p className="text-zinc-500 text-sm mb-6">Ingresa la contraseña para ver los diseños enviados.</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500/60"
            />
            <button
              type="submit"
              disabled={!password}
              className="bg-rose-500 hover:bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-4" />
          <p className="text-zinc-400 text-sm">Cargando diseños…</p>
        </div>
      </div>
    )
  }

  if (view === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">{errorMsg}</p>
          <button
            onClick={() => { setView('login'); setPassword('') }}
            className="text-sm text-zinc-500 underline hover:text-zinc-300 transition"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Diseños enviados
            </h1>
            <p className="text-zinc-500 text-sm mt-1">{items.length} diseño{items.length !== 1 ? 's' : ''} en total</p>
          </div>
          <button
            onClick={() => { setView('login'); setPassword(''); setSessionPwd('') }}
            className="text-sm text-zinc-500 hover:text-zinc-300 border border-white/10 rounded-lg px-3 py-1.5 transition"
          >
            Cerrar sesión
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            <p className="text-5xl mb-4">📭</p>
            <p>Todavía no hay diseños enviados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.key}
                className="bg-[#111118] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-rose-500/30 transition-colors group"
              >
                <div className="aspect-square bg-zinc-900 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl(item.key)}
                    alt={item.name || 'Diseño'}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-zinc-100 font-semibold text-sm truncate">
                    {item.name || <span className="text-zinc-600 italic">Sin nombre</span>}
                  </p>
                  <p className="text-zinc-500 text-xs mt-1">
                    {item.date || item.uploaded.split('T')[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
