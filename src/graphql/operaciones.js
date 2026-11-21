import { gql } from "@apollo/client";

export const OBTENER_OPCIONES_DESTINO = gql`
  query ObtenerOpcionesDestino($destinoId: ID!, $simularError: String) {
    opcionesDestino(destinoId: $destinoId, simularError: $simularError) {
      vuelos {
        id
        aerolinea
        origen
        fechaSalida
        fechaRegreso
        precio
        disponible
      }
      hoteles {
        id
        nombre
        estrellas
        precioPorNoche
        disponible
        imagen
      }
    }
  }
`;
