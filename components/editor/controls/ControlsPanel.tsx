'use client'

import type Konva from 'konva'
import { type Theme, COLOR_SCHEMES } from '@/lib/themes'
import type { PlacaElement } from '@/lib/elements'
import ThemeSelector from './ThemeSelector'
import ColorPicker from './ColorPicker'
import ViewToggle from './ViewToggle'
import Toolbar from './Toolbar'
import ElementProperties from './ElementProperties'
import DownloadButton from './DownloadButton'

interface Props {
  theme: Theme
  colorSchemeId: string
  viewMode: '2d' | '3d'
  selectedEl: PlacaElement | null
  stageRef: React.RefObject<Konva.Stage>
  onThemeChange: (theme: Theme) => void
  onColorChange: (id: string) => void
  onViewModeChange: (mode: '2d' | '3d') => void
  onAddElement: (el: PlacaElement) => void
  onUpdateElement: (id: string, patch: Partial<PlacaElement>) => void
  onRemoveElement: (id: string) => void
}

export default function ControlsPanel({
  theme, colorSchemeId, viewMode, selectedEl, stageRef,
  onThemeChange, onColorChange, onViewModeChange, onAddElement, onUpdateElement, onRemoveElement,
}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <ViewToggle viewMode={viewMode} onChange={onViewModeChange} />

      {viewMode === '3d' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-sm text-gray-500">
          Estás en vista 3D. Volvé a <span className="font-medium text-gray-700">Editar (2D)</span> para
          mover, agregar o modificar elementos.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
            <Toolbar onAdd={onAddElement} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            {selectedEl ? (
              <ElementProperties
                el={selectedEl}
                onUpdate={(patch) => onUpdateElement(selectedEl.id, patch)}
                onRemove={() => onRemoveElement(selectedEl.id)}
              />
            ) : (
              <p className="text-sm text-gray-400 text-center py-2">
                Tocá un elemento en la placa para editarlo, moverlo o redimensionarlo.
              </p>
            )}
          </div>
        </>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-5">
        <ThemeSelector selectedId={theme.id} onSelect={onThemeChange} />
        <ColorPicker colors={COLOR_SCHEMES} selectedId={colorSchemeId} onChange={onColorChange} />
      </div>

      <DownloadButton stageRef={stageRef} name="" />

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        La imagen se descarga en alta resolución (2×). Ideal para imprimir o compartir.
      </p>
    </div>
  )
}
