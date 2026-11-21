import { NavLink } from "react-router";

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <span className="font-bold text-lg text-sky-700">🌍 Viajes Mundo</span>
        <div className="flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold text-sky-600"
                : "text-slate-600 hover:text-sky-600"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/destinos"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-sky-600"
                : "text-slate-600 hover:text-sky-600"
            }
          >
            Destinos
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
