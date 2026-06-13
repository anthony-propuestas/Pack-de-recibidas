import {
  FRAME_W, HEADER_H, STRIP_W, RIBBON_H, RIBBON_Y,
  CENTER_X, CENTER_Y, CENTER_W, CENTER_H, ICON_SIZE,
} from './frameConfig'
import { getColorScheme, type Theme } from './themes'

type BaseEl = {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
}

export type TextEl = BaseEl & {
  type: 'text'
  text: string
  fontFamily: string
  fontSize: number
  fill: string
  fontStyle: string // '', 'bold', 'italic', 'bold italic'
  align: 'left' | 'center' | 'right'
}

export type EmojiEl = BaseEl & {
  type: 'emoji'
  char: string
}

export type ImageEl = BaseEl & {
  type: 'image'
  src: string
}

export type PlacaElement = TextEl | EmojiEl | ImageEl

const NOTCH = 28

// Default text element ids (rebuilt on theme change). User-added elements use crypto.randomUUID().
export const CAREER_ID = 'el-career'
export const NAME_ID = 'el-name'
export const YEAR_ID = 'el-year'

export function isDefaultId(id: string): boolean {
  return id.startsWith('el-')
}

export function newId(): string {
  return crypto.randomUUID()
}

function iconColumn(icons: string[], xCenter: number, side: 'L' | 'R'): EmojiEl[] {
  const step = CENTER_H / icons.length
  return icons.map((char, i) => {
    const yCenter = CENTER_Y + step * i + step / 2
    return {
      id: `el-icon-${side}${i}`,
      type: 'emoji' as const,
      char,
      x: xCenter - ICON_SIZE / 2,
      y: yCenter - ICON_SIZE / 2,
      width: ICON_SIZE,
      height: ICON_SIZE,
      rotation: 0,
    }
  })
}

// Builds the editable elements derived from a theme: career title, ribbon name, year badge, and the icon columns.
export function buildDefaultElements(theme: Theme, colorSchemeId: string): PlacaElement[] {
  const color = getColorScheme(colorSchemeId)

  const career: TextEl = {
    id: CAREER_ID,
    type: 'text',
    text: theme.defaultHeader,
    x: STRIP_W + 10,
    y: 22,
    width: CENTER_W - 20,
    height: 40,
    rotation: 0,
    fontFamily: 'Oswald',
    fontSize: 30,
    fill: color.text,
    fontStyle: 'bold',
    align: 'center',
  }

  const name: TextEl = {
    id: NAME_ID,
    type: 'text',
    text: `${theme.defaultNamePrefix} Tu Apellido`,
    x: NOTCH + 10,
    y: RIBBON_Y + RIBBON_H / 2 - 22,
    width: FRAME_W - (NOTCH + 10) * 2,
    height: 44,
    rotation: 0,
    fontFamily: 'Playfair Display',
    fontSize: 30,
    fill: color.text,
    fontStyle: 'italic',
    align: 'center',
  }

  const year: TextEl = {
    id: YEAR_ID,
    type: 'text',
    text: new Date().getFullYear().toString(),
    x: 8,
    y: RIBBON_Y - 52,
    width: STRIP_W - 16,
    height: 32,
    rotation: 0,
    fontFamily: 'Oswald',
    fontSize: 24,
    fill: '#ffffff',
    fontStyle: 'bold',
    align: 'center',
  }

  return [
    career,
    name,
    year,
    ...iconColumn(theme.leftIcons, STRIP_W / 2, 'L'),
    ...iconColumn(theme.rightIcons, FRAME_W - STRIP_W / 2, 'R'),
  ]
}

// Factories for user-added elements, placed centered in the hollow photo area.
export function makeTextElement(): TextEl {
  return {
    id: newId(),
    type: 'text',
    text: 'Texto nuevo',
    x: CENTER_X + CENTER_W / 2 - 110,
    y: CENTER_Y + CENTER_H / 2 - 20,
    width: 220,
    height: 40,
    rotation: 0,
    fontFamily: 'Montserrat',
    fontSize: 32,
    fill: '#444444',
    fontStyle: 'bold',
    align: 'center',
  }
}

export function makeEmojiElement(char: string): EmojiEl {
  return {
    id: newId(),
    type: 'emoji',
    char,
    x: CENTER_X + CENTER_W / 2 - 40,
    y: CENTER_Y + CENTER_H / 2 - 40,
    width: 80,
    height: 80,
    rotation: 0,
  }
}

export function makeImageElement(src: string, naturalW: number, naturalH: number): ImageEl {
  const maxW = CENTER_W * 0.7
  const scale = naturalW > maxW ? maxW / naturalW : 1
  const w = naturalW * scale
  const h = naturalH * scale
  return {
    id: newId(),
    type: 'image',
    src,
    x: CENTER_X + CENTER_W / 2 - w / 2,
    y: CENTER_Y + CENTER_H / 2 - h / 2,
    width: w,
    height: h,
    rotation: 0,
  }
}
