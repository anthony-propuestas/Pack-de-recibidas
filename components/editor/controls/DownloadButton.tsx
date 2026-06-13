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
    // Recorta al bounding box de todo el contenido (marco + elementos, incluyendo lo que
    // sobresale del marco) para exportar los objetos completos sin un borde transparente enorme.
    const layer = stage.getLayers()[0]
    const box = layer.getClientRect({ relativeTo: stage })
    const pad = 4
    const x = Math.max(0, Math.floor(box.x - pad))
    const y = Math.max(0, Math.floor(box.y - pad))
    const width = Math.min(stage.width() - x, Math.ceil(box.width + pad * 2))
    const height = Math.min(stage.height() - y, Math.ceil(box.height + pad * 2))
    const dataURL = stage.toDataURL({ x, y, width, height, pixelRatio: 2 })
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
