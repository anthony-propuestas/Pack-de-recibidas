'use client'

import { useState } from 'react'
import { makeTextElement, makeEmojiElement, type PlacaElement } from '@/lib/elements'
import EmojiPickerPopover from './EmojiPickerPopover'
import ImageUploader from './ImageUploader'

export default function Toolbar({ onAdd }: { onAdd: (el: PlacaElement) => void }) {
  const [emojiOpen, setEmojiOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Agregar elemento
      </label>
      <div className="relative grid grid-cols-3 gap-2">
        <button
          onClick={() => onAdd(makeTextElement())}
          className="flex flex-col items-center gap-1 py-3 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50/50 text-gray-700 text-xs transition"
        >
          <span className="text-lg">➕</span>
          Texto
        </button>

        <button
          onClick={() => setEmojiOpen((v) => !v)}
          className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-xs transition ${
            emojiOpen ? 'border-rose-400 bg-rose-50' : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50/50 text-gray-700'
          }`}
        >
          <span className="text-lg">😀</span>
          Emoji
        </button>

        <ImageUploader onAdd={onAdd} />

        {emojiOpen && (
          <EmojiPickerPopover
            onSelect={(native) => onAdd(makeEmojiElement(native))}
            onClose={() => setEmojiOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
