const ANIO = new Date().getFullYear();
export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center text-center gap-2 text-sm text-slate-500">
        <p>© {ANIO} 🌍 Viajes Mundo — Desarrollo Frontend II (PFY2202)</p>
      </div>
    </footer>
  );
}
