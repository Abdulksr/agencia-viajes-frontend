import { Link } from "react-router";

export function DestinoCard({ destino }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
      <img
        src={destino.imagen}
        alt={`${destino.nombre}, ${destino.pais}`}
        className="h-48 w-full object-cover"
      />
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700">
            {destino.pais}
          </span>
          <h3 className="text-xl font-bold text-slate-900">{destino.nombre}</h3>
          <p className="text-sm text-slate-600">{destino.descripcion}</p>

          <div className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
              Actividades populares
            </p>
            <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
              {destino.actividades.map((actividad) => (
                <li key={actividad}>{actividad}</li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          to={`/destino/${destino.id}`}
          className="block text-center px-4 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition"
        >
          Ver vuelos y hoteles →
        </Link>
      </div>
    </article>
  );
}
