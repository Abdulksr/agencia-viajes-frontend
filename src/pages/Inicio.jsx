import { Link } from "react-router";
import { DestinoCard } from "../components/DestinoCard";
import { EstadoCarga } from "../components/EstadoCarga";
import { AlertaError } from "../components/AlertaError";

export function Inicio({ destinos, cargando, error, cargarDestinos }) {
  const destacados = destinos.slice(0, 3);

  return (
    <section className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Planifica tu próximo viaje ✈️
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Explora destinos internacionales y nacionales, descubre sus
          actividades populares y revisa vuelos y hoteles disponibles en tiempo
          real.
        </p>
        <Link
          to="/destinos"
          className="inline-block px-5 py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
        >
          Explorar todos los destinos
        </Link>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">
          Destinos destacados
        </h2>

        {cargando && <EstadoCarga mensaje="Cargando destinos destacados..." />}

        {!cargando && destacados.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destacados.map((destino) => (
              <DestinoCard key={destino.id} destino={destino} />
            ))}
          </div>
        )}

        {error && (
          <AlertaError
            mensaje={error}
            onReintentar={() => cargarDestinos()}
            deshabilitado={cargando}
          />
        )}
      </div>
    </section>
  );
}
