'use client'

import { useRef } from 'react'
import { Text, Image as KonvaImage } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import type { PlacaElement, TextEl, EmojiEl, ImageEl } from '@/lib/elements'
import { emojiToImageUrl } from '@/lib/emoji'

interface CommonProps {
  onSelect: () => void
  onChange: (patch: Partial<PlacaElement>) => void
}

function TextNode({
  el, onSelect, onChange,
}: { el: TextEl } & CommonProps) {
  const ref = useRef<Konva.Text>(null)

  return (
    <Text
      id={el.id}
      ref={ref}
      text={el.text}
      x={el.x}
      y={el.y}
      width={el.width}
      rotation={el.rotation}
      fontSize={el.fontSize}
      fontFamily={el.fontFamily}
      fontStyle={el.fontStyle}
      fill={el.fill}
      align={el.align}
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
          fontSize: Math.max(6, el.fontSize * scaleY),
        })
      }}
    />
  )
}

// Emoji renderizado como imagen real (estilo Apple) en vez de texto, para que se vea igual
// en 2D, 3D y el PNG. crossOrigin 'anonymous' evita "tainting" del canvas (toDataURL sigue ok).
function EmojiNode({ el, onSelect, onChange }: { el: EmojiEl } & CommonProps) {
  const ref = useRef<Konva.Image>(null)
  const [img] = useImage(emojiToImageUrl(el.char) ?? '', 'anonymous')

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
  if (el.type === 'emoji') {
    // Si no hay imagen para el carácter, cae a texto para no quedar invisible.
    if (emojiToImageUrl(el.char)) return <EmojiNode el={el} onSelect={onSelect} onChange={onChange} />
    const fallback: TextEl = {
      ...el, type: 'text', text: el.char, fontFamily: '', fontSize: el.height * 0.78,
      fill: '#000000', fontStyle: '', align: 'center',
    }
    return <TextNode el={fallback} onSelect={onSelect} onChange={onChange} />
  }
  return <TextNode el={el} onSelect={onSelect} onChange={onChange} />
}
