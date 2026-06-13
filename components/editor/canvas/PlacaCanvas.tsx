'use client'

import { useRef, useEffect } from 'react'
import { Stage, Layer, Transformer } from 'react-konva'
import type Konva from 'konva'
import { FRAME_W, FRAME_H } from '@/lib/frameConfig'
import type { ColorScheme } from '@/lib/themes'
import type { PlacaElement } from '@/lib/elements'
import { useFontsReady } from '@/lib/useFontsReady'
import FrameTemplate from './FrameTemplate'
import ElementNode from './ElementNode'

interface Props {
  color: ColorScheme
  elements: PlacaElement[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onChange: (id: string, patch: Partial<PlacaElement>) => void
  stageRef: React.RefObject<Konva.Stage>
}

export default function PlacaCanvas({
  color, elements, selectedId, onSelect, onChange, stageRef,
}: Props) {
  const layerRef = useRef<Konva.Layer>(null)
  const trRef = useRef<Konva.Transformer>(null)
  const fontsReady = useFontsReady()

  // Adjunta el Transformer al nodo seleccionado.
  useEffect(() => {
    const tr = trRef.current
    const layer = layerRef.current
    if (!tr || !layer) return
    const node = selectedId ? layer.findOne(`#${selectedId}`) : null
    tr.nodes(node ? [node] : [])
    tr.getLayer()?.batchDraw()
  }, [selectedId, elements])

  // Redibuja cuando las webfonts terminan de cargar (Konva no se entera solo).
  useEffect(() => {
    if (fontsReady) layerRef.current?.batchDraw()
  }, [fontsReady])

  function handleStageMouseDown(e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) {
    // Click en zona vacía (stage o marco no interactivo) => deseleccionar.
    if (e.target === e.target.getStage()) onSelect(null)
  }

  return (
    <Stage
      ref={stageRef}
      width={FRAME_W}
      height={FRAME_H}
      onMouseDown={handleStageMouseDown}
      onTouchStart={handleStageMouseDown}
    >
      <Layer ref={layerRef}>
        <FrameTemplate color={color} />
        {elements.map((el) => (
          <ElementNode
            key={el.id}
            el={el}
            onSelect={() => onSelect(el.id)}
            onChange={(patch) => onChange(el.id, patch)}
          />
        ))}
        <Transformer
          ref={trRef}
          rotateEnabled
          flipEnabled={false}
          keepRatio={false}
          boundBoxFunc={(oldBox, newBox) => (newBox.width < 20 || newBox.height < 20 ? oldBox : newBox)}
        />
      </Layer>
    </Stage>
  )
}
