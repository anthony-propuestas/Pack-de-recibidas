'use client'

import { Rect, Text, Shape, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import {
  FRAME_W, FRAME_H, HEADER_H, STRIP_W, RIBBON_H, RIBBON_Y, CENTER_H,
} from '@/lib/frameConfig'
import type { ColorScheme } from '@/lib/themes'

const NOTCH = 28

// Parte decorativa NO interactiva del marco. El centro (115..685 × 85..512) queda transparente:
// es un hueco real con márgenes decorados (no hay "tu foto aquí"). listening={false} para que los
// clics atraviesen y no seleccionen el fondo.
export default function FrameTemplate({ color }: { color: ColorScheme }) {
  const [capImage] = useImage('/icons/gradcap.svg')

  return (
    <>
      {/* Franja izquierda */}
      <Rect x={0} y={HEADER_H} width={STRIP_W} height={CENTER_H} fill={color.primary} listening={false} />
      {/* Franja derecha */}
      <Rect
        x={FRAME_W - STRIP_W}
        y={HEADER_H}
        width={STRIP_W}
        height={CENTER_H}
        fill={color.primary}
        listening={false}
      />

      {/* Barra de cabecera */}
      <Rect x={0} y={0} width={FRAME_W} height={HEADER_H} fill={color.header} listening={false} />

      {/* Badge del año (fondo) */}
      <Rect
        x={8}
        y={RIBBON_Y - 60}
        width={STRIP_W - 16}
        height={50}
        fill={color.header}
        cornerRadius={6}
        listening={false}
      />

      {/* Etiqueta "¡ME RECIBÍ!" */}
      <Text
        x={FRAME_W - STRIP_W + 4}
        y={RIBBON_Y - 55}
        width={STRIP_W - 8}
        height={44}
        text={'¡ME\nRECIBÍ!'}
        fontSize={12}
        fontStyle="bold"
        fill={color.header}
        align="center"
        verticalAlign="middle"
        listening={false}
      />

      {/* Cinta inferior (ribbon) */}
      <Shape
        sceneFunc={(ctx, shape) => {
          ctx.beginPath()
          ctx.moveTo(NOTCH, RIBBON_Y)
          ctx.lineTo(FRAME_W - NOTCH, RIBBON_Y)
          ctx.lineTo(FRAME_W, RIBBON_Y + RIBBON_H / 2)
          ctx.lineTo(FRAME_W - NOTCH, FRAME_H)
          ctx.lineTo(NOTCH, FRAME_H)
          ctx.lineTo(0, RIBBON_Y + RIBBON_H / 2)
          ctx.closePath()
          ctx.fillStrokeShape(shape)
        }}
        fill={color.ribbon}
        stroke={color.header}
        strokeWidth={2}
        listening={false}
      />
      {/* Borde decorativo interior de la cinta */}
      <Shape
        sceneFunc={(ctx, shape) => {
          const m = 6
          ctx.beginPath()
          ctx.moveTo(NOTCH + m, RIBBON_Y + m)
          ctx.lineTo(FRAME_W - NOTCH - m, RIBBON_Y + m)
          ctx.lineTo(FRAME_W - m, RIBBON_Y + RIBBON_H / 2)
          ctx.lineTo(FRAME_W - NOTCH - m, FRAME_H - m)
          ctx.lineTo(NOTCH + m, FRAME_H - m)
          ctx.lineTo(m, RIBBON_Y + RIBBON_H / 2)
          ctx.closePath()
          ctx.fillStrokeShape(shape)
        }}
        fill="transparent"
        stroke={color.header}
        strokeWidth={1}
        opacity={0.5}
        listening={false}
      />

      {/* Birrete (esquina superior izquierda) */}
      {capImage && (
        <KonvaImage image={capImage} x={-10} y={-20} width={175} height={155} listening={false} />
      )}
    </>
  )
}
