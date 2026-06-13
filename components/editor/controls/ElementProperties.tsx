'use client'

import type { PlacaElement, TextEl } from '@/lib/elements'
import FontPicker from './FontPicker'

interface Props {
  el: PlacaElement
  onUpdate: (patch: Partial<PlacaElement>) => void
  onRemove: () => void
}

function TextControls({ el, onUpdate }: { el: TextEl; onUpdate: Props['onUpdate'] }) {
  const isBold = el.fontStyle.includes('bold')
  const isItalic = el.fontStyle.includes('italic')
  const setStyle = (bold: boolean, italic: boolean) => {
    const parts: string[] = []
    if (bold) parts.push('bold')
    if (italic) parts.push('italic')
    onUpdate({ fontStyle: parts.join(' ') })
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Texto</label>
        <textarea
          value={el.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          rows={2}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition resize-none"
        />
      </div>

      <FontPicker value={el.fontFamily} onChange={(family) => onUpdate({ fontFamily: family })} />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Tamaño · {Math.round(el.fontSize)}px
        </label>
        <input
          type="range"
          min={8}
          max={120}
          value={el.fontSize}
          onChange={(e) => onUpdate({ fontSize: Number(e.target.value) })}
          className="accent-rose-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Color</label>
          <input
            type="color"
            value={el.fill}
            onChange={(e) => onUpdate({ fill: e.target.value })}
            className="w-10 h-9 rounded border border-gray-200 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Estilo</label>
          <div className="flex gap-1">
            <button
              onClick={() => setStyle(!isBold, isItalic)}
              className={`flex-1 py-2 rounded-lg border text-sm font-bold transition ${
                isBold ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-600'
              }`}
            >
              B
            </button>
            <button
              onClick={() => setStyle(isBold, !isItalic)}
              className={`flex-1 py-2 rounded-lg border text-sm italic transition ${
                isItalic ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-600'
              }`}
            >
              i
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Alineación</label>
        <div className="flex gap-1">
          {(['left', 'center', 'right'] as const).map((a) => (
            <button
              key={a}
              onClick={() => onUpdate({ align: a })}
              className={`flex-1 py-2 rounded-lg border text-sm transition ${
                el.align === a ? 'border-rose-400 bg-rose-50 text-rose-700' : 'border-gray-200 text-gray-600'
              }`}
            >
              {a === 'left' ? '⬅' : a === 'center' ? '⬌' : '➡'}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function SizeControl({ el, onUpdate }: { el: PlacaElement; onUpdate: Props['onUpdate'] }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Tamaño · {Math.round(el.width)}px
      </label>
      <input
        type="range"
        min={20}
        max={500}
        value={el.width}
        onChange={(e) => {
          const w = Number(e.target.value)
          const ratio = el.height / el.width
          onUpdate({ width: w, height: w * ratio })
        }}
        className="accent-rose-500"
      />
    </div>
  )
}

export default function ElementProperties({ el, onUpdate, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {el.type === 'text' ? 'Texto seleccionado' : el.type === 'emoji' ? 'Emoji seleccionado' : 'Imagen seleccionada'}
        </label>
        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
        >
          🗑️ Eliminar
        </button>
      </div>

      {el.type === 'text' ? (
        <TextControls el={el} onUpdate={onUpdate} />
      ) : (
        <SizeControl el={el} onUpdate={onUpdate} />
      )}
    </div>
  )
}
