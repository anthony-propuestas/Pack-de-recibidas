const reviews = [
  {
    name: 'Florencia M.',
    career: 'Medicina — UBA',
    text: 'Lo usé para mi recibida y quedó hermoso. En 10 minutos tenía el diseño listo para imprimir. Mis compañeras me preguntaron dónde lo había hecho.',
    avatar: '🩺',
  },
  {
    name: 'Sebastián G.',
    career: 'Ingeniería — UTN',
    text: 'Super fácil de usar. Puse mi nombre, elegí los colores de la carrera y descargué en alta resolución. Calidad profesional sin complicaciones.',
    avatar: '⚙️',
  },
  {
    name: 'Valentina R.',
    career: 'Abogacía — UNC',
    text: 'Me sorprendió lo personalizable que es. Pude cambiar fuentes, agregar emojis y ajustar todo a mi gusto. La placa quedó increíble.',
    avatar: '⚖️',
  },
]

export default function Testimonials() {
  return (
    <section className="py-14 px-4 bg-white border-t border-rose-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2
            style={{ fontFamily: "'Oswald', sans-serif" }}
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 uppercase tracking-wide"
          >
            Lo que dicen los egresados
          </h2>
          <p className="text-slate-400 text-sm">Miles de egresados ya crearon su placa con nosotros.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-[#fdf5f8] rounded-xl border border-rose-100 p-5 flex flex-col gap-3 shadow-sm"
            >
              <div className="flex gap-0.5 text-rose-400 text-sm">★★★★★</div>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-rose-100">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-lg shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <div className="text-slate-700 text-sm font-semibold">{r.name}</div>
                  <div className="text-slate-400 text-xs">{r.career}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
