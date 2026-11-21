import { DestinoCard } from "../components/DestinoCard";
import { EstadoCarga } from "../components/EstadoCarga";
import { AlertaError } from "../components/AlertaError";

export function Destinos({ destinos, cargando, error, cargarDestinos }) {
  const es404 = error?.includes("no encontrados");
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Destinos Disponibles
          </h1>
          <p className="text-slate-600">
            Catálogo consultado mediante API REST Mock (MSW).
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => cargarDestinos()}
            disabled={cargando}
            className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 disabled:opacity-50"
          >
            Actualizar
          </button>
          <button
            onClick={() => cargarDestinos("404")}
            disabled={cargando}
            className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-200 disabled:opacity-50"
          >
            Simular 404 REST
          </button>
          <button
            onClick={() => cargarDestinos("500")}
            disabled={cargando}
            className="px-3 py-2 rounded-lg bg-rose-100 text-rose-800 text-sm font-medium hover:bg-rose-200 disabled:opacity-50"
          >
            Simular 500 REST
          </button>
        </div>
      </div>

      {cargando && <EstadoCarga mensaje="Cargando destinos disponibles..." />}

      {error && (
        <AlertaError
          mensaje={error}
          detalle={
            destinos.length > 0
              ? "Mostrando los últimos destinos cargados."
              : undefined
          }
          onReintentar={es404 ? undefined : () => cargarDestinos()}
          deshabilitado={cargando}
        />
      )}

      {!cargando && destinos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinos.map((destino) => (
            <DestinoCard key={destino.id} destino={destino} />
          ))}
        </div>
      )}
    </section>
  );
}
