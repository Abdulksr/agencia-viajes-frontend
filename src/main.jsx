import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./graphql/client";
import "./index.css";
import App from "./App.jsx";

async function iniciarAplicacion() {
  try {
    const mocksHabilitados =
      import.meta.env.DEV || import.meta.env.VITE_MSW_ENABLED !== "false";

    if (mocksHabilitados) {
      const { worker } = await import("./mocks/browser");

      await worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
          options: { scope: import.meta.env.BASE_URL },
        },
      });
    }
  } catch (error) {
    console.error("No se pudo iniciar el Service Worker de MSW:", error);
  }

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
    </StrictMode>,
  );
}

iniciarAplicacion().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);
});
