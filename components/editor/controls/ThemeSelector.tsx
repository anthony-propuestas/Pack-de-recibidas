'use client'

import { THEMES, type Theme } from '@/lib/themes'

interface Props {
  selectedId: string
  onSelect: (theme: Theme) => void
}

export default function ThemeSelector({ selectedId, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Carrera / Tema
      </label>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-sm transition ${
              selectedId === theme.id
                ? 'border-rose-400 bg-rose-50 text-rose-700 font-medium'
                : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/50 text-gray-700'
            }`}
          >
            <span className="text-lg">{theme.emoji}</span>
            <span className="leading-tight text-xs">{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
