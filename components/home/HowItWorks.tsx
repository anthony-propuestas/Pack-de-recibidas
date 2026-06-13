const steps = [
  {
    emoji: '🎨',
    number: '01',
    title: 'Elegí tu diseño',
    description:
      'Seleccioná la carrera de tu elección. Cada tema trae íconos y colores únicos relacionados con tu profesión.',
  },
  {
    emoji: '✏️',
    number: '02',
    title: 'Personalizá tu placa',
    description:
      'Agregá tu nombre, ajustá el título, el año y el color que más te gusta. El preview se actualiza en tiempo real.',
  },
  {
    emoji: '📦',
    number: '03',
    title: 'Recibí tu placa',
    description:
      'Descargá el diseño en alta resolución y envialo a imprimir, o contactanos para que lo produzcamos nosotros.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">¿Cómo funciona?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Tres pasos simples para tener tu placa de recibida lista para el gran día.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100"
            >
              <div className="text-4xl mb-4">{step.emoji}</div>
              <div className="absolute top-4 right-4 text-rose-200 font-black text-3xl">
                {step.number}
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji: '🎨', label: 'Diseños únicos por carrera' },
            { emoji: '📐', label: 'Alta resolución para impresión' },
            { emoji: '⚡', label: 'Preview instantáneo' },
            { emoji: '💌', label: 'Producción y envío a domicilio' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-2xl">{f.emoji}</span>
              <span className="text-sm text-gray-600 font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
