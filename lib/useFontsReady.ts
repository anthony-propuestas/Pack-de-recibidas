import { useEffect, useState } from 'react'
import { FONT_FAMILIES } from './fonts'

// Konva pinta texto sobre <canvas>, que no se actualiza solo cuando una webfont termina de cargar.
// Este hook espera a que todas las familias estén disponibles y devuelve `true` para forzar un redraw.
export function useFontsReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    if (!fonts) {
      setReady(true)
      return
    }
    Promise.all(
      FONT_FAMILIES.flatMap((family) => [
        fonts.load(`16px "${family}"`),
        fonts.load(`bold 16px "${family}"`),
        fonts.load(`italic 16px "${family}"`),
      ]),
    )
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return ready
}
