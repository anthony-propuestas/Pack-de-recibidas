'use client'

import { FONTS } from '@/lib/fonts'

interface Props {
  value: string
  onChange: (family: string) => void
}

export default function FontPicker({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Tipografía
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition"
        style={{ fontFamily: value }}
      >
        {FONTS.map((f) => (
          <option key={f.family} value={f.family} style={{ fontFamily: f.family }}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  )
}
