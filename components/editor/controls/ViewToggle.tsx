'use client'

interface Props {
  viewMode: '2d' | '3d'
  onChange: (mode: '2d' | '3d') => void
}

export default function ViewToggle({ viewMode, onChange }: Props) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      <button
        onClick={() => onChange('2d')}
        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
          viewMode === '2d' ? 'bg-white shadow text-rose-600' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        ✏️ Editar (2D)
      </button>
      <button
        onClick={() => onChange('3d')}
        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
          viewMode === '3d' ? 'bg-white shadow text-rose-600' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        🧊 Ver en 3D
      </button>
    </div>
  )
}
