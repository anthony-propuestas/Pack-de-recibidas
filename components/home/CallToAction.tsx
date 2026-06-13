export default function CallToAction() {
  return (
    <section className="py-14 px-4 relative overflow-hidden bg-[#09090f]">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/40 via-[#12050a] to-[#09090f] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-rose-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="text-5xl mb-5">🎓</div>
        <h2
          style={{ fontFamily: "'Oswald', sans-serif" }}
          className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4 uppercase tracking-wide"
        >
          ¿Lista para celebrar tu logro?
        </h2>
        <p className="text-zinc-400 text-base mb-8 leading-relaxed max-w-xl mx-auto">
          Creá tu placa en minutos y sorprendé a todos el día de tu egreso.
          Personalizá, descargá y lucila con orgullo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/placa-de-recibida"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-3.5 rounded-full text-base transition shadow-lg shadow-rose-500/25"
          >
            Crear mi placa gratis →
          </a>
          <a
            href="mailto:contacto@packderecibidas.com"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-semibold px-8 py-3.5 rounded-full text-base transition"
          >
            Contactarnos
          </a>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row gap-8 justify-center text-center">
          {[
            { value: '500+', label: 'Placas entregadas' },
            { value: '20+', label: 'Carreras disponibles' },
            { value: '100%', label: 'Personalizadas' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{ fontFamily: "'Oswald', sans-serif" }}
                className="text-3xl font-bold text-rose-400"
              >
                {stat.value}
              </div>
              <div className="text-zinc-500 text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
