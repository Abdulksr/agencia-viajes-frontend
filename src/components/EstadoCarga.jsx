export function EstadoCarga({ mensaje = "Cargando..." }) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-medium"
    >
      <span className="h-4 w-4 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
      <span>{mensaje}</span>
    </div>
  );
}
