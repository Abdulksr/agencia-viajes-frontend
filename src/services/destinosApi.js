import { REST_BASE_URL } from "../graphql/endpoint";

export async function obtenerDestinos(tipoError = "", signal) {
  const endpoint = tipoError
    ? `${REST_BASE_URL}/destinos?error=${tipoError}`
    : `${REST_BASE_URL}/destinos`;

  try {
    const respuesta = await fetch(endpoint, { signal });

    if (!respuesta.ok) {
      if (respuesta.status === 404) throw new Error("Destinos no encontrados");
      if (respuesta.status === 500)
        throw new Error("Error interno del servidor");
      throw new Error("Error desconocido al obtener los destinos");
    }

    return await respuesta.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "No fue posible conectarse al servidor, reintente más tarde",
        {
          cause: error,
        },
      );
    }
    throw error;
  }
}
