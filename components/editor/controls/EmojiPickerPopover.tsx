'use client'

import { useEffect, useRef } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface Props {
  onSelect: (native: string) => void
  onClose: () => void
}

export default function EmojiPickerPopover({ onSelect, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [onClose])

  return (
    <div ref={ref} className="absolute z-30 mt-2 left-0">
      <Picker
        data={data}
        onEmojiSelect={(emoji: { native: string }) => {
          onSelect(emoji.native)
          onClose()
        }}
        theme="light"
        set="apple"
        previewPosition="none"
        skinTonePosition="none"
        locale="es"
      />
    </div>
  )
}
