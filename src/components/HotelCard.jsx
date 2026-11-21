export function HotelCard({ hotel }) {
  return (
    <article
      key={hotel.id}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2"
    >
      {hotel.imagen && (
        <img
          src={hotel.imagen}
          alt={hotel.nombre}
          loading="lazy"
          className="h-44 w-full object-cover rounded-lg"
        />
      )}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">{hotel.nombre}</h3>

        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${hotel.disponible ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
        >
          {hotel.disponible ? "Disponible" : "Agotado"}
        </span>
      </div>
      <p className="text-sm text-amber-600">{"⭐".repeat(hotel.estrellas)}</p>
      <p className="text-lg font-bold text-sky-700">
        <span>${hotel.precioPorNoche.toLocaleString("es-CL")}</span>{" "}
        <span className="text-xs font-normal text-slate-500">/ noche</span>
      </p>
    </article>
  );
}
