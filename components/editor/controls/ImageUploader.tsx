'use client'

import { useRef } from 'react'
import { makeImageElement, type PlacaElement } from '@/lib/elements'

export default function ImageUploader({ onAdd }: { onAdd: (el: PlacaElement) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onload = () => onAdd(makeImageElement(url, img.naturalWidth, img.naturalHeight))
    img.src = url
    e.target.value = '' // permite volver a subir el mismo archivo
  }

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center gap-1 py-3 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50/50 text-gray-700 text-xs transition"
      >
        <span className="text-lg">🖼️</span>
        Imagen
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </>
  )
}
