'use client'

import { useRef, useState } from 'react'
import type Konva from 'konva'
import { THEMES, getTheme, type Theme } from '@/lib/themes'
import { FRAME_W, FRAME_H } from '@/lib/frameConfig'
import PlacaCanvas from './canvas/PlacaCanvas'
import ControlsPanel from './controls/ControlsPanel'

interface EditorState {
  themeId: string
  headerText: string
  namePrefix: string
  name: string
  year: string
  colorSchemeId: string
}

function buildInitialState(theme: Theme): EditorState {
  return {
    themeId: theme.id,
    headerText: theme.defaultHeader,
    namePrefix: theme.defaultNamePrefix,
    name: '',
    year: new Date().getFullYear().toString(),
    colorSchemeId: theme.defaultColorId,
  }
}

export default function FrameEditor() {
  const stageRef = useRef<Konva.Stage>(null)
  const [state, setState] = useState<EditorState>(() => buildInitialState(THEMES[0]))

  const theme = getTheme(state.themeId)

  function handleThemeChange(newTheme: Theme) {
    setState({
      themeId: newTheme.id,
      headerText: newTheme.defaultHeader,
      namePrefix: newTheme.defaultNamePrefix,
      name: state.name,
      year: state.year,
      colorSchemeId: newTheme.defaultColorId,
    })
  }

  function handleChange(patch: Partial<EditorState>) {
    setState((prev) => ({ ...prev, ...patch }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Diseñá tu Placa de Recibida</h1>
          <p className="text-gray-500 text-sm mt-1">
            Personalizá el marco y descargá tu diseño en alta resolución.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Canvas preview */}
          <div className="flex-1 flex flex-col items-center gap-4">
            <div
              className="overflow-hidden rounded-xl shadow-2xl border border-gray-100"
              style={{ maxWidth: FRAME_W, width: '100%' }}
            >
              <div
                style={{
                  width: FRAME_W,
                  height: FRAME_H,
                  transformOrigin: 'top left',
                }}
                className="scale-preview"
              >
                <PlacaCanvas
                  theme={theme}
                  headerText={state.headerText}
                  namePrefix={state.namePrefix}
                  name={state.name}
                  year={state.year}
                  colorSchemeId={state.colorSchemeId}
                  stageRef={stageRef}
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Vista previa — {FRAME_W} × {FRAME_H} px
            </p>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-80 shrink-0">
            <ControlsPanel
              state={state}
              theme={theme}
              stageRef={stageRef}
              onChange={handleChange}
              onThemeChange={handleThemeChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
