const careers = [
  {
    career: 'Medicina',
    title: 'Médica / Médico',
    emojis: ['🩺', '❤️', '💊'],
    borderClass: 'border-rose-200 hover:border-rose-400',
    labelClass: 'text-rose-500',
    glowClass: 'bg-rose-50',
    avatar: '👩‍⚕️',
  },
  {
    career: 'Ingeniería',
    title: 'Ingeniera / Ingeniero',
    emojis: ['⚙️', '🔧', '💡'],
    borderClass: 'border-blue-100 hover:border-blue-300',
    labelClass: 'text-blue-400',
    glowClass: 'bg-blue-50',
    avatar: '👷',
  },
  {
    career: 'Derecho',
    title: 'Abogada / Abogado',
    emojis: ['⚖️', '📜', '🏛️'],
    borderClass: 'border-amber-100 hover:border-amber-300',
    labelClass: 'text-amber-500',
    glowClass: 'bg-amber-50',
    avatar: '👩‍💼',
  },
  {
    career: 'Diseño',
    title: 'Diseñadora / Diseñador',
    emojis: ['🎨', '✏️', '🖌️'],
    borderClass: 'border-purple-100 hover:border-purple-300',
    labelClass: 'text-purple-400',
    glowClass: 'bg-purple-50',
    avatar: '🧑‍🎨',
  },
]

export default function Gallery() {
  return (
    <section className="py-16 px-4 bg-white border-t border-rose-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 uppercase tracking-wide"
          >
            Un diseño para cada carrera
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            Cada profesión tiene sus propios íconos y paleta. Elegí el tuyo y personalizalo al máximo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {careers.map((c) => (
            <a
              key={c.career}
              href="/placa-de-recibida"
              className={`group relative bg-white rounded-2xl border ${c.borderClass} p-5 flex flex-col items-center text-center gap-3 hover:scale-[1.03] transition-all shadow-sm hover:shadow-md`}
            >
              <div className={`absolute inset-0 ${c.glowClass} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="relative flex gap-1.5 text-2xl">{c.emojis.map((e) => <span key={e}>{e}</span>)}</div>

              <div className="relative">
                <div className={`text-[10px] font-semibold uppercase tracking-widest ${c.labelClass} mb-0.5`}>
                  {c.title}
                </div>
                <div
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-slate-800 font-bold text-lg italic"
                >
                  {c.career}
                </div>
              </div>

              <div className="relative w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl">
                {c.avatar}
              </div>

              <div className="relative">
                <div className="text-slate-600 text-xs font-semibold">Tu nombre aquí</div>
                <div className="text-slate-400 text-xs">Promoción 2024</div>
              </div>

              <div className="relative text-[11px] text-slate-400 group-hover:text-rose-500 transition">
                Personalizar →
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/placa-de-recibida"
            className="text-rose-500 hover:text-rose-600 text-sm font-medium transition"
          >
            Ver todos los diseños disponibles →
          </a>
        </div>
      </div>
    </section>
  )
}
