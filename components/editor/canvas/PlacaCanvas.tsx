'use client'

import { useRef, useEffect } from 'react'
import { Stage, Layer, Rect, Text, Shape, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import {
  FRAME_W, FRAME_H, HEADER_H, STRIP_W, RIBBON_H, RIBBON_Y,
  CENTER_X, CENTER_Y, CENTER_W, CENTER_H, ICON_SIZE,
} from '@/lib/frameConfig'
import { getColorScheme, type Theme, type ColorScheme } from '@/lib/themes'

interface Props {
  theme: Theme
  headerText: string
  namePrefix: string
  name: string
  year: string
  colorSchemeId: string
  stageRef: React.RefObject<Konva.Stage | null>
}

const NOTCH = 28

function IconColumn({
  icons,
  xCenter,
}: {
  icons: string[]
  xCenter: number
}) {
  const availH = CENTER_H
  const step = availH / icons.length
  return (
    <>
      {icons.map((emoji, i) => {
        const yCenter = CENTER_Y + step * i + step / 2
        return (
          <Text
            key={i}
            text={emoji}
            fontSize={ICON_SIZE * 0.62}
            x={xCenter - ICON_SIZE / 2}
            y={yCenter - ICON_SIZE / 2}
            width={ICON_SIZE}
            height={ICON_SIZE}
            align="center"
            verticalAlign="middle"
          />
        )
      })}
    </>
  )
}

export default function PlacaCanvas({
  theme, headerText, namePrefix, name, year, colorSchemeId, stageRef,
}: Props) {
  const color: ColorScheme = getColorScheme(theme, colorSchemeId)
  const [capImage] = useImage('/icons/gradcap.svg')

  const ribbonPoints = [
    NOTCH, RIBBON_Y,
    FRAME_W - NOTCH, RIBBON_Y,
    FRAME_W, RIBBON_Y + RIBBON_H / 2,
    FRAME_W - NOTCH, FRAME_H,
    NOTCH, FRAME_H,
    0, RIBBON_Y + RIBBON_H / 2,
  ]

  const fullName = name ? `${namePrefix} ${name}` : `${namePrefix} Tu Apellido`

  return (
    <Stage ref={stageRef} width={FRAME_W} height={FRAME_H}>
      <Layer>
        {/* Background frame */}
        <Rect x={0} y={0} width={FRAME_W} height={FRAME_H} fill={color.primary} />

        {/* White center (photo area) */}
        <Rect
          x={CENTER_X}
          y={CENTER_Y}
          width={CENTER_W}
          height={CENTER_H}
          fill="#f9f5f5"
          cornerRadius={2}
        />

        {/* "Tu foto aquí" placeholder text */}
        <Text
          x={CENTER_X}
          y={CENTER_Y + CENTER_H / 2 - 20}
          width={CENTER_W}
          text="✦  tu foto aquí  ✦"
          fontSize={20}
          fill="#ccb5b8"
          align="center"
          fontStyle="italic"
        />

        {/* Header bar */}
        <Rect x={0} y={0} width={FRAME_W} height={HEADER_H} fill={color.header} />

        {/* Career title */}
        <Text
          x={STRIP_W + 10}
          y={0}
          width={CENTER_W - 20}
          height={HEADER_H}
          text={headerText || theme.defaultHeader}
          fontSize={28}
          fontStyle="bold"
          fill={color.text}
          align="center"
          verticalAlign="middle"
          letterSpacing={2}
        />

        {/* Left icons */}
        <IconColumn icons={theme.leftIcons} xCenter={STRIP_W / 2} />

        {/* Right icons */}
        <IconColumn icons={theme.rightIcons} xCenter={FRAME_W - STRIP_W / 2} />

        {/* Year badge in left strip */}
        <Rect
          x={8}
          y={RIBBON_Y - 60}
          width={STRIP_W - 16}
          height={50}
          fill={color.header}
          cornerRadius={6}
        />
        <Text
          x={8}
          y={RIBBON_Y - 60}
          width={STRIP_W - 16}
          height={50}
          text={year}
          fontSize={22}
          fontStyle="bold"
          fill="#ffffff"
          align="center"
          verticalAlign="middle"
        />

        {/* "¡ME RECIBÍ!" label */}
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
        />

        {/* Ribbon shape */}
        <Shape
          sceneFunc={(ctx, shape) => {
            ctx.beginPath()
            ctx.moveTo(ribbonPoints[0], ribbonPoints[1])
            for (let i = 2; i < ribbonPoints.length; i += 2) {
              ctx.lineTo(ribbonPoints[i], ribbonPoints[i + 1])
            }
            ctx.closePath()
            ctx.fillStrokeShape(shape)
          }}
          fill={color.ribbon}
          stroke={color.header}
          strokeWidth={2}
        />

        {/* Ribbon border line (decorative inner border) */}
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
        />

        {/* Graduate name on ribbon */}
        <Text
          x={NOTCH + 10}
          y={RIBBON_Y}
          width={FRAME_W - (NOTCH + 10) * 2}
          height={RIBBON_H}
          text={fullName}
          fontSize={30}
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fill={color.header}
          align="center"
          verticalAlign="middle"
        />

        {/* Graduation cap (overlaps top-left corner) */}
        {capImage && (
          <KonvaImage
            image={capImage}
            x={-10}
            y={-20}
            width={175}
            height={155}
          />
        )}
      </Layer>
    </Stage>
  )
}
