import { useQuery } from "@apollo/client/react";
import { Link, useParams, useSearchParams } from "react-router";
import { OBTENER_OPCIONES_DESTINO } from "../graphql/operaciones";
import { EstadoCarga } from "../components/EstadoCarga";
import { AlertaError } from "../components/AlertaError";
import { VueloCard } from "../components/VueloCard";
import { HotelCard } from "../components/HotelCard";

export function DetalleDestino({ destinos }) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const simularError = searchParams.get("error") || "";

  const destino = destinos.find((d) => String(d.id) === String(id));

  const { data, loading, error, refetch } = useQuery(OBTENER_OPCIONES_DESTINO, {
    variables: { destinoId: id, simularError },
  });
  const opciones = data?.opcionesDestino;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/destinos"
            className="text-sm font-medium text-sky-600 hover:underline"
          >
            ← Volver a destinos
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            {destino ? `${destino.nombre}, ${destino.pais}` : `Destino #${id}`}
          </h1>
          <p className="text-slate-600">
            Vuelos y hoteles consultados mediante API GraphQL Mock (Apollo
            Client + MSW).
          </p>
        </div>

        {/* Controles para probar errores GraphQL */}
        <div className="flex flex-wrap gap-2">
          {simularError ? (
            <button
              onClick={() => setSearchParams({})}
              className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
            >
              Desactivar error ({simularError})
            </button>
          ) : (
            <>
              <button
                onClick={() => setSearchParams({ error: "404" })}
                className="px-3 py-2 rounded-lg bg-amber-100 text-amber-800 text-sm font-medium hover:bg-amber-200"
              >
                Simular 404 GraphQL
              </button>
              <button
                onClick={() => setSearchParams({ error: "500" })}
                className="px-3 py-2 rounded-lg bg-rose-100 text-rose-800 text-sm font-medium hover:bg-rose-200"
              >
                Simular 500 GraphQL
              </button>
            </>
          )}
        </div>
      </div>

      {loading && (
        <EstadoCarga mensaje="Consultando vuelos y hoteles vía GraphQL..." />
      )}

      {error && (
        <AlertaError
          mensaje={error.message}
          detalle="Error recibido desde el endpoint GraphQL."
          onReintentar={
            simularError === "404"
              ? undefined
              : simularError
                ? () => setSearchParams({})
                : () => refetch()
          }
          deshabilitado={loading}
        />
      )}

      {!loading && !error && !opciones && (
        <AlertaError
          mensaje={`No se encontraron opciones de viaje para el destino #${id}.`}
          detalle="Verifica el enlace o regresa al listado de destinos."
        />
      )}

      {!loading && !error && opciones && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna de Vuelos */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">
              ✈️ Vuelos disponibles
            </h2>
            {opciones.vuelos.map((vuelo) => (
              <VueloCard key={vuelo.id} vuelo={vuelo} />
            ))}
          </div>

          {/* Columna de Hoteles */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">
              🏨 Hoteles disponibles
            </h2>
            {opciones.hoteles.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
