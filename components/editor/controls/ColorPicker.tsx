'use client'

import { type ColorScheme } from '@/lib/themes'

interface Props {
  colors: ColorScheme[]
  selectedId: string
  onChange: (id: string) => void
}

export default function ColorPicker({ colors, selectedId, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Color
      </label>
      <div className="flex gap-2 flex-wrap">
        {colors.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            title={c.label}
            className={`w-9 h-9 rounded-full border-4 transition ${
              selectedId === c.id ? 'border-gray-700 scale-110' : 'border-white shadow hover:scale-105'
            }`}
            style={{ backgroundColor: c.color }}
          />
        ))}
      </div>
    </div>
  )
}
