export default function Hero() {
  return (
    <section className="relative bg-[#09090f] min-h-[90vh] flex items-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/30 via-transparent to-violet-950/15 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-rose-600/8 rounded-full translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/8 rounded-full -translate-x-1/4 blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-16">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            🎓 Placas de recibida personalizadas
          </div>

          <h1
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-100 leading-none mb-5 uppercase tracking-tight"
          >
            Celebrá tu logro<br />
            <span className="text-rose-500">con una placa única</span>
          </h1>

          <p className="text-zinc-400 text-base mb-8 leading-relaxed max-w-lg">
            Marcos fotográficos personalizados para tu graduación. Elegí tu carrera,
            personalizá colores y nombre. Preview en tiempo real, descarga en alta resolución.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href="/placa-de-recibida"
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-full text-base transition shadow-xl shadow-rose-500/25 text-center"
            >
              Crear mi placa gratis →
            </a>
            <a
              href="#como-funciona"
              className="bg-white/5 hover:bg-white/10 text-zinc-300 font-medium px-8 py-4 rounded-full text-base transition border border-white/10 text-center"
            >
              ¿Cómo funciona?
            </a>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
            {['100% gratis para diseñar', 'Sin registro requerido', 'Alta resolución para imprimir'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: placa mockup */}
        <div className="flex justify-center">
          <PlacaMockup />
        </div>
      </div>
    </section>
  )
}

function PlacaMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-8 bg-rose-500/15 blur-3xl rounded-full" />

      <div className="relative w-56 h-72 sm:w-64 sm:h-80 bg-gradient-to-b from-[#1c0810] to-[#120510] rounded-xl border border-rose-500/25 shadow-2xl shadow-rose-950 flex flex-col items-center justify-between py-5 px-4 overflow-hidden">
        {/* Corner brackets */}
        <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-rose-400/70 rounded-tl" />
        <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-rose-400/70 rounded-tr" />
        <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-rose-400/70 rounded-bl" />
        <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-rose-400/70 rounded-br" />

        {/* Career header */}
        <div className="text-center">
          <div className="flex justify-center gap-2 text-xl mb-1.5">🩺❤️💊</div>
          <div className="text-rose-400/80 text-[10px] uppercase tracking-[0.2em] font-semibold">Egresada</div>
          <div
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-zinc-100 text-lg italic font-bold mt-0.5"
          >
            Medicina
          </div>
        </div>

        {/* Photo circle */}
        <div className="w-24 h-24 rounded-full border-2 border-rose-500/40 bg-zinc-900/80 flex items-center justify-center shadow-inner">
          <span className="text-4xl">👩‍⚕️</span>
        </div>

        {/* Name */}
        <div className="text-center">
          <div
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-zinc-200 text-sm font-semibold tracking-wide"
          >
            María González
          </div>
          <div className="text-zinc-500 text-xs mt-0.5">Promoción 2024</div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-6 bg-[#15151e] border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
        <div className="text-[11px] text-zinc-400 font-medium">🎨 20+ diseños</div>
      </div>
      <div className="absolute -bottom-3 -left-6 bg-[#15151e] border border-white/[0.08] rounded-xl px-3 py-2 shadow-xl">
        <div className="text-[11px] text-zinc-400 font-medium">⚡ Preview en vivo</div>
      </div>
    </div>
  )
}
