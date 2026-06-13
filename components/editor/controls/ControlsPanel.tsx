'use client'

import type Konva from 'konva'
import { type Theme } from '@/lib/themes'
import ThemeSelector from './ThemeSelector'
import ColorPicker from './ColorPicker'
import TextInput from './TextInput'
import DownloadButton from './DownloadButton'

interface EditorState {
  themeId: string
  headerText: string
  namePrefix: string
  name: string
  year: string
  colorSchemeId: string
}

interface Props {
  state: EditorState
  theme: Theme
  stageRef: React.RefObject<Konva.Stage | null>
  onChange: (patch: Partial<EditorState>) => void
  onThemeChange: (theme: Theme) => void
}

export default function ControlsPanel({ state, theme, stageRef, onChange, onThemeChange }: Props) {
  return (
    <div className="flex flex-col gap-5 w-full max-w-xs">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-5">
        <ThemeSelector selectedId={state.themeId} onSelect={onThemeChange} />
        <ColorPicker
          colors={theme.colors}
          selectedId={state.colorSchemeId}
          onChange={(id) => onChange({ colorSchemeId: id })}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
        <TextInput
          label="Nombre de la carrera (cabecera)"
          value={state.headerText}
          onChange={(v) => onChange({ headerText: v })}
          placeholder={theme.defaultHeader}
          maxLength={40}
        />
        <div className="flex gap-2">
          <div className="w-28">
            <TextInput
              label="Título"
              value={state.namePrefix}
              onChange={(v) => onChange({ namePrefix: v })}
              placeholder="Licenciada"
              maxLength={20}
            />
          </div>
          <div className="flex-1">
            <TextInput
              label="Apellido / Nombre"
              value={state.name}
              onChange={(v) => onChange({ name: v })}
              placeholder="Tu Apellido"
              maxLength={30}
            />
          </div>
        </div>
        <TextInput
          label="Año"
          value={state.year}
          onChange={(v) => onChange({ year: v })}
          placeholder="2024"
          maxLength={4}
        />
      </div>

      <DownloadButton stageRef={stageRef} name={state.name} />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        La imagen se descarga en alta resolución (2×).{' '}
        Ideal para imprimir o compartir en redes.
      </p>
    </div>
  )
}
