import { Link } from "react-router";

export default function PaginaNoEncontrada() {
  return (
    <section className="space-y-8">
      <div
        className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm
          space-y-4"
      >
        <h1 className="text-3xl font-bold text-slate-900">
          Página no encontrada
        </h1>
        <p className="text-slate-600 max-w-2xl">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 rounded-lg bg-indigo-600 text-white
              font-medium hover:bg-indigo-700"
        >
          Volver a la página principal
        </Link>
      </div>
    </section>
  );
}
