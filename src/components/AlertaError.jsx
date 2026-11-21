export function AlertaError({
  mensaje,
  detalle,
  onReintentar,
  deshabilitado = false,
}) {
  return (
    <div
      role="alert"
      className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex flex-wrap items-center justify-between gap-4"
    >
      <div>
        <p className="font-semibold">{mensaje}</p>
        {detalle && <p className="text-sm text-rose-700 mt-1">{detalle}</p>}
      </div>

      {onReintentar && (
        <button
          onClick={onReintentar}
          disabled={deshabilitado}
          className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 disabled:opacity-50"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
