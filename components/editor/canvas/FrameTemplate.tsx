'use client'

import { Rect } from 'react-konva'
import {
  FRAME_W, HEADER_H, STRIP_W, RIBBON_H, RIBBON_Y, CENTER_H,
} from '@/lib/frameConfig'
import type { ColorScheme } from '@/lib/themes'

// Parte decorativa NO interactiva del marco. El centro (115..685 × 85..512) queda transparente:
// es un hueco real con márgenes decorados (no hay "tu foto aquí"). listening={false} para que los
// clics atraviesen y no seleccionen el fondo. Todo el marco es de un solo color sólido.
export default function FrameTemplate({ color }: { color: ColorScheme }) {
  return (
    <>
      {/* Franja izquierda */}
      <Rect x={0} y={HEADER_H} width={STRIP_W} height={CENTER_H} fill={color.color} listening={false} />
      {/* Franja derecha */}
      <Rect
        x={FRAME_W - STRIP_W}
        y={HEADER_H}
        width={STRIP_W}
        height={CENTER_H}
        fill={color.color}
        listening={false}
      />

      {/* Barra de cabecera */}
      <Rect x={0} y={0} width={FRAME_W} height={HEADER_H} fill={color.color} listening={false} />

      {/* Badge del año (fondo) */}
      <Rect
        x={8}
        y={RIBBON_Y - 60}
        width={STRIP_W - 16}
        height={50}
        fill={color.color}
        cornerRadius={6}
        listening={false}
      />

      {/* Barra inferior sólida */}
      <Rect x={0} y={RIBBON_Y} width={FRAME_W} height={RIBBON_H} fill={color.color} listening={false} />
    </>
  )
}
