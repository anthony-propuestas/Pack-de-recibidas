'use client'

import { useRef } from 'react'
import { Text, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import type { PlacaElement, TextEl, EmojiEl, ImageEl } from '@/lib/elements'

interface CommonProps {
  onSelect: () => void
  onChange: (patch: Partial<PlacaElement>) => void
}

function TextNode({
  el, onSelect, onChange,
}: { el: TextEl | EmojiEl } & CommonProps) {
  const ref = useRef<Konva.Text>(null)
  const isEmoji = el.type === 'emoji'
  const text = isEmoji ? (el as EmojiEl).char : (el as TextEl).text
  const fontSize = isEmoji ? el.height * 0.78 : (el as TextEl).fontSize

  return (
    <Text
      id={el.id}
      ref={ref}
      text={text}
      x={el.x}
      y={el.y}
      width={el.width}
      height={isEmoji ? el.height : undefined}
      rotation={el.rotation}
      fontSize={fontSize}
      fontFamily={isEmoji ? undefined : (el as TextEl).fontFamily}
      fontStyle={isEmoji ? undefined : (el as TextEl).fontStyle}
      fill={isEmoji ? undefined : (el as TextEl).fill}
      align={isEmoji ? 'center' : (el as TextEl).align}
      verticalAlign={isEmoji ? 'middle' : undefined}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
      onTransformEnd={() => {
        const node = ref.current
        if (!node) return
        const scaleX = node.scaleX()
        const scaleY = node.scaleY()
        node.scaleX(1)
        node.scaleY(1)
        if (isEmoji) {
          onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, el.height * scaleY),
          })
        } else {
          onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(20, node.width() * scaleX),
            fontSize: Math.max(6, (el as TextEl).fontSize * scaleY),
          })
        }
      }}
    />
  )
}

function ImageNode({ el, onSelect, onChange }: { el: ImageEl } & CommonProps) {
  const ref = useRef<Konva.Image>(null)
  const [img] = useImage(el.src)

  return (
    <KonvaImage
      id={el.id}
      ref={ref}
      image={img}
      x={el.x}
      y={el.y}
      width={el.width}
      height={el.height}
      rotation={el.rotation}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
      onTransformEnd={() => {
        const node = ref.current
        if (!node) return
        const scaleX = node.scaleX()
        const scaleY = node.scaleY()
        node.scaleX(1)
        node.scaleY(1)
        onChange({
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          width: Math.max(20, node.width() * scaleX),
          height: Math.max(20, node.height() * scaleY),
        })
      }}
    />
  )
}

export default function ElementNode({
  el, onSelect, onChange,
}: { el: PlacaElement } & CommonProps) {
  if (el.type === 'image') return <ImageNode el={el} onSelect={onSelect} onChange={onChange} />
  return <TextNode el={el} onSelect={onSelect} onChange={onChange} />
}
