export const FRAME_W = 800
export const FRAME_H = 600

// Margen de "bleed": el stage de edición es más grande que la placa para que los
// objetos puedan sobresalir del marco sin recortarse. La placa sigue siendo FRAME_W×FRAME_H.
export const MARGIN = 200
export const STAGE_W = FRAME_W + MARGIN * 2
export const STAGE_H = FRAME_H + MARGIN * 2

export const HEADER_H = 85
export const STRIP_W = 115
export const RIBBON_H = 88
export const RIBBON_Y = FRAME_H - RIBBON_H

export const CENTER_X = STRIP_W
export const CENTER_Y = HEADER_H
export const CENTER_W = FRAME_W - STRIP_W * 2
export const CENTER_H = RIBBON_Y - HEADER_H

export const ICON_SIZE = 72
