export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 py-20 px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full translate-y-1/2 -translate-x-1/4 opacity-40 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-block bg-rose-100 text-rose-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          🎓 Placas de recibida personalizadas
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
          Celebrá tu logro con una{' '}
          <span className="text-rose-500">placa única</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Diseñamos marcos fotográficos personalizados para tu graduación. Elegí tu carrera,
          personalizá los colores y el nombre, y recibí tu placa lista para usar el día de tu
          egreso.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/placa-de-recibida"
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-4 rounded-full text-lg transition shadow-lg shadow-rose-200 hover:shadow-rose-300"
          >
            Crear mi placa →
          </a>
          <a
            href="#como-funciona"
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-full text-lg transition border border-gray-200 shadow-sm"
          >
            ¿Cómo funciona?
          </a>
        </div>

        {/* Sample frame mockup */}
        <div className="mt-16 inline-flex items-center gap-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-6">
          <span className="text-5xl">🎓</span>
          <div className="text-left">
            <div className="font-bold text-gray-800 text-sm uppercase tracking-widest">
              Tu carrera aquí
            </div>
            <div className="text-rose-500 font-serif italic text-xl mt-0.5">
              Licenciada / Licenciado
            </div>
          </div>
          <div className="ml-4 flex flex-col gap-1">
            {['⛑️', '💡', '⚠️'].map((e) => (
              <span key={e} className="text-2xl">{e}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
