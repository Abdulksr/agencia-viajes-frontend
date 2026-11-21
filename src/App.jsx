import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { obtenerDestinos } from "./services/destinosApi";
import { Inicio } from "./pages/Inicio";
import { Destinos } from "./pages/Destinos";
import { DetalleDestino } from "./pages/DetalleDestino";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function App() {
  const [destinos, setDestinos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarDestinos = useCallback((tipoError = "") => {
    setCargando(true);
    setError("");

    obtenerDestinos(tipoError)
      .then((datos) => setDestinos(datos))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    obtenerDestinos("", controller.signal)
      .then((datos) => setDestinos(datos))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                destinos={destinos}
                cargando={cargando}
                error={error}
                cargarDestinos={cargarDestinos}
              />
            }
          />
          <Route
            path="/destinos"
            element={
              <Destinos
                destinos={destinos}
                cargando={cargando}
                error={error}
                cargarDestinos={cargarDestinos}
              />
            }
          />
          <Route
            path="/destino/:id"
            element={<DetalleDestino destinos={destinos} />}
          />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
