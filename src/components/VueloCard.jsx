export function VueloCard({ vuelo }) {
  return (
    <article
      key={vuelo.id}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">{vuelo.aerolinea}</h3>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${vuelo.disponible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
        >
          {vuelo.disponible ? "Disponible" : "Agotado"}
        </span>
      </div>
      <p className="text-sm text-slate-600">Origen: {vuelo.origen}</p>
      <p className="text-sm text-slate-600">
        Fechas: {vuelo.fechaSalida} al {vuelo.fechaRegreso}
      </p>
      <p className="text-lg font-bold text-sky-700">
        ${vuelo.precio.toLocaleString("es-CL")}
      </p>
    </article>
  );
}
