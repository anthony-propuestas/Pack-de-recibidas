import dynamic from 'next/dynamic'

const FrameEditor = dynamic(
  () => import('@/components/editor/FrameEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-3">🎓</div>
          <p className="text-gray-500">Cargando editor...</p>
        </div>
      </div>
    ),
  }
)

export default function PlacaPage() {
  return <FrameEditor />
}
