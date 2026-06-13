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
    <section id="como-funciona" className="py-14 px-4 bg-[#09090f] border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-3xl md:text-4xl font-bold text-zinc-100 mb-2 uppercase tracking-wide"
          >
            ¿Cómo funciona?
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm">
            Tres pasos para tener tu placa lista para el gran día.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-[#111118] rounded-xl p-5 border border-white/[0.06] hover:border-rose-500/20 transition-colors"
            >
              <div className="text-3xl mb-3">{step.emoji}</div>
              <div
                className="absolute top-4 right-5 text-white/[0.04] font-black text-5xl select-none"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {step.number}
              </div>
              <h3
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="font-semibold text-zinc-200 text-base mb-1.5 uppercase tracking-wide"
              >
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { emoji: '🎨', label: 'Diseños únicos por carrera' },
            { emoji: '📐', label: 'Alta resolución para impresión' },
            { emoji: '⚡', label: 'Preview instantáneo' },
            { emoji: '💌', label: 'Producción y envío a domicilio' },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 bg-[#111118] border border-white/[0.06] rounded-xl px-4 py-3"
            >
              <span className="text-xl">{f.emoji}</span>
              <span className="text-xs text-zinc-400 font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
