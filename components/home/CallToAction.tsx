export default function CallToAction() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-rose-500 to-pink-600">
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-5xl mb-6">🎓</div>
        <h2 className="text-3xl font-extrabold text-white mb-4">
          ¿Lista para celebrar tu logro?
        </h2>
        <p className="text-rose-100 text-lg mb-10 leading-relaxed">
          Creá tu placa en minutos y sorprendé a todos el día de tu egreso.
          Personalizá, descargá y lucila con orgullo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/placa-de-recibida"
            className="bg-white text-rose-600 hover:bg-rose-50 font-bold px-8 py-4 rounded-full text-lg transition shadow-lg"
          >
            Crear mi placa gratis →
          </a>
          <a
            href="mailto:contacto@packderecibidas.com"
            className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-lg transition"
          >
            Contactarnos
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-rose-400 flex flex-col sm:flex-row gap-8 justify-center text-center">
          {[
            { value: '500+', label: 'Placas entregadas' },
            { value: '20+', label: 'Carreras disponibles' },
            { value: '100%', label: 'Personalizadas' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="text-rose-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
