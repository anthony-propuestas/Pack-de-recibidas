'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type Konva from 'konva'
import { THEMES, getTheme, getColorScheme, type Theme } from '@/lib/themes'
import { FRAME_W, FRAME_H, MARGIN } from '@/lib/frameConfig'
import {
  buildDefaultElements, isDefaultId, type PlacaElement,
} from '@/lib/elements'
import PlacaCanvas from './canvas/PlacaCanvas'
import Placa3D from './three/Placa3D'
import ControlsPanel from './controls/ControlsPanel'

interface EditorState {
  themeId: string
  colorSchemeId: string
  elements: PlacaElement[]
  selectedId: string | null
  viewMode: '2d' | '3d'
}

function buildInitialState(theme: Theme): EditorState {
  return {
    themeId: theme.id,
    colorSchemeId: theme.defaultColorId,
    elements: buildDefaultElements(theme, theme.defaultColorId),
    selectedId: null,
    viewMode: '2d',
  }
}

// Escala la placa (800×600) para que entre en el ancho disponible sin romper el mapeo de punteros de Konva.
function useFitScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      setScale(Math.min(1, w / FRAME_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { ref, scale }
}

export default function FrameEditor() {
  const stageRef = useRef<Konva.Stage>(null)
  const [state, setState] = useState<EditorState>(() => buildInitialState(THEMES[0]))
  const { ref: fitRef, scale } = useFitScale()

  const theme = getTheme(state.themeId)
  const color = getColorScheme(state.colorSchemeId)
  const selectedEl = state.elements.find((e) => e.id === state.selectedId) ?? null

  const selectElement = useCallback((id: string | null) => {
    setState((s) => ({ ...s, selectedId: id }))
  }, [])

  const updateElement = useCallback((id: string, patch: Partial<PlacaElement>) => {
    setState((s) => ({
      ...s,
      elements: s.elements.map((e) => (e.id === id ? ({ ...e, ...patch } as PlacaElement) : e)),
    }))
  }, [])

  const addElement = useCallback((el: PlacaElement) => {
    setState((s) => ({ ...s, elements: [...s.elements, el], selectedId: el.id, viewMode: '2d' }))
  }, [])

  const removeElement = useCallback((id: string) => {
    setState((s) => ({ ...s, elements: s.elements.filter((e) => e.id !== id), selectedId: null }))
  }, [])

  function handleThemeChange(newTheme: Theme) {
    setState((s) => ({
      ...s,
      themeId: newTheme.id,
      colorSchemeId: newTheme.defaultColorId,
      // Regenera el marco por defecto; conserva los elementos que agregó el usuario.
      elements: [
        ...buildDefaultElements(newTheme, newTheme.defaultColorId),
        ...s.elements.filter((e) => !isDefaultId(e.id)),
      ],
      selectedId: null,
    }))
  }

  function handleColorChange(colorId: string) {
    setState((s) => ({ ...s, colorSchemeId: colorId }))
  }

  function setViewMode(mode: '2d' | '3d') {
    setState((s) => ({ ...s, viewMode: mode, selectedId: mode === '3d' ? null : s.selectedId }))
  }

  return (
    <div className="min-h-screen bg-[#09090f] py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-5">
          <h1
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-2xl font-bold text-zinc-100 uppercase tracking-wide"
          >
            Diseñá tu Placa de Recibida
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Arrastrá, redimensioná y agregá textos, emojis e imágenes. Mirá tu placa en 3D.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Vista (2D editable / 3D preview) */}
          <div className="flex-1 w-full flex flex-col items-center gap-4">
            <div
              ref={fitRef}
              className="w-full flex justify-center"
              style={{ maxWidth: FRAME_W }}
            >
              {/* Canvas 2D: siempre montado (en 3D queda oculto pero su bitmap alimenta la textura).
                  La tarjeta mide lo que la placa; el stage es más grande (bleed) y sobresale con
                  overflow visible para poder ver objetos que pasan el borde del marco. */}
              <div
                className="rounded-xl shadow-2xl border border-white/[0.06] bg-[#111118] overflow-hidden"
                style={{
                  width: FRAME_W * scale,
                  height: FRAME_H * scale,
                  display: state.viewMode === '3d' ? 'none' : 'block',
                }}
              >
                <div
                  className="relative"
                  style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
                >
                  {/* Offset negativo: la región de placa del stage (en MARGIN,MARGIN) se alinea con (0,0). */}
                  <div className="absolute" style={{ left: -MARGIN, top: -MARGIN }}>
                    <PlacaCanvas
                      color={color}
                      elements={state.elements}
                      selectedId={state.selectedId}
                      onSelect={selectElement}
                      onChange={updateElement}
                      stageRef={stageRef}
                    />
                  </div>
                </div>
              </div>

              {state.viewMode === '3d' && (
                <div
                  className="rounded-xl shadow-2xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900"
                  style={{ width: FRAME_W * scale, height: FRAME_H * scale }}
                >
                  <Placa3D stageRef={stageRef} />
                </div>
              )}
            </div>
            <p className="text-xs text-zinc-600">
              {state.viewMode === '3d'
                ? 'Arrastrá para orbitar · scroll para zoom · botón derecho para mover'
                : `Vista previa — ${FRAME_W} × ${FRAME_H} px`}
            </p>
          </div>

          {/* Controles */}
          <div className="w-full lg:w-80 shrink-0">
            <ControlsPanel
              theme={theme}
              colorSchemeId={state.colorSchemeId}
              viewMode={state.viewMode}
              selectedEl={selectedEl}
              elements={state.elements}
              stageRef={stageRef}
              onThemeChange={handleThemeChange}
              onColorChange={handleColorChange}
              onViewModeChange={setViewMode}
              onAddElement={addElement}
              onUpdateElement={updateElement}
              onRemoveElement={removeElement}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
