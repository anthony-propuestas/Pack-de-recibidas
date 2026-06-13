'use client'

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  maxLength?: number
}

export default function TextInput({ label, value, onChange, placeholder, maxLength }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength ?? 60}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition"
      />
    </div>
  )
}
