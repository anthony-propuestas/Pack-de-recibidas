'use client'

import { useState } from 'react'
import type Konva from 'konva'

interface Props {
  stageRef: React.RefObject<Konva.Stage>
  nameText: string
}

type Status = 'idle' | 'confirming' | 'sending' | 'success' | 'rate_limited' | 'error'

const TODAY_KEY = () => `sendCount_${new Date().toISOString().split('T')[0]}`
const MAX_DAILY = 3

function getLocalCount(): number {
  if (typeof window === 'undefined') return 0
  return parseInt(localStorage.getItem(TODAY_KEY()) ?? '0', 10)
}

function incrementLocalCount() {
  const key = TODAY_KEY()
  const count = getLocalCount()
  localStorage.setItem(key, String(count + 1))
}

function getPngBlob(stage: Konva.Stage): Blob {
  const layer = stage.getLayers()[0]
  const box = layer.getClientRect({ relativeTo: stage })
  const pad = 4
  const x = Math.max(0, Math.floor(box.x - pad))
  const y = Math.max(0, Math.floor(box.y - pad))
  const width = Math.min(stage.width() - x, Math.ceil(box.width + pad * 2))
  const height = Math.min(stage.height() - y, Math.ceil(box.height + pad * 2))
  const dataURL = stage.toDataURL({ x, y, width, height, pixelRatio: 2 })
  const base64 = dataURL.split(',')[1]
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: 'image/png' })
}

export default function SendDesignButton({ stageRef, nameText }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')

  function handleOpenModal() {
    if (getLocalCount() >= MAX_DAILY) {
      setStatus('rate_limited')
      return
    }
    setName(nameText)
    setStatus('confirming')
  }

  async function handleSend() {
    const stage = stageRef.current
    if (!stage || !name.trim()) return

    setStatus('sending')

    const blob = getPngBlob(stage)
    const formData = new FormData()
    formData.append('name', name.trim())
    formData.append('image', blob, 'placa.png')

    try {
      const res = await fetch('/api/submit', { method: 'POST', body: formData })
      if (res.status === 429) {
        setStatus('rate_limited')
        return
      }
      if (!res.ok) {
        setStatus('error')
        return
      }
      incrementLocalCount()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-4 text-center">
        <p className="text-emerald-400 font-semibold text-sm">Diseño enviado</p>
        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
          Escribinos por WhatsApp con tu nombre y te lo enviamos.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 text-xs text-zinc-500 underline hover:text-zinc-300 transition"
        >
          Volver al editor
        </button>
      </div>
    )
  }

  if (status === 'rate_limited') {
    return (
      <div className="w-full bg-amber-900/30 border border-amber-500/30 rounded-xl p-4 text-center">
        <p className="text-amber-400 font-semibold text-sm">Límite alcanzado</p>
        <p className="text-zinc-400 text-xs mt-1">Ya enviaste 3 diseños hoy. Intentá mañana.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 text-xs text-zinc-500 underline hover:text-zinc-300 transition"
        >
          Volver
        </button>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="w-full bg-red-900/30 border border-red-500/30 rounded-xl p-4 text-center">
        <p className="text-red-400 font-semibold text-sm">Error al enviar</p>
        <p className="text-zinc-400 text-xs mt-1">Hubo un problema. Intentá de nuevo.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-3 text-xs text-zinc-500 underline hover:text-zinc-300 transition"
        >
          Volver
        </button>
      </div>
    )
  }

  if (status === 'confirming' || status === 'sending') {
    return (
      <div className="w-full bg-[#111118] border border-white/[0.10] rounded-xl p-4 flex flex-col gap-3">
        <p className="text-sm font-medium text-zinc-200">Enviar tu diseño</p>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500">Tu nombre tal como aparece en la placa</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'sending'}
            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-rose-500/60 disabled:opacity-50"
            placeholder="Tu nombre completo"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatus('idle')}
            disabled={status === 'sending'}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 text-sm font-medium py-2 px-3 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            disabled={status === 'sending' || !name.trim()}
            className="flex-1 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-1"
          >
            {status === 'sending' ? (
              <>
                <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando…
              </>
            ) : (
              'Enviar diseño'
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleOpenModal}
      className="w-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
    >
      <span>📤</span>
      Enviar mi diseño
    </button>
  )
}
