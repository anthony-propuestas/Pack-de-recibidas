'use client'

import type Konva from 'konva'

interface Props {
  stageRef: React.RefObject<Konva.Stage>
  name: string
}

export default function DownloadButton({ stageRef, name }: Props) {
  function handleDownload() {
    const stage = stageRef.current
    if (!stage) return
    const dataURL = stage.toDataURL({ pixelRatio: 2 })
    const link = document.createElement('a')
    link.download = `placa-${name || 'recibida'}.png`
    link.href = dataURL
    link.click()
  }

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
    >
      <span>⬇️</span>
      Descargar PNG
    </button>
  )
}
