import { http, HttpResponse, delay } from "msw";
import { graphql } from "msw/graphql";
import destinos from "../data/destinos.json";
import opcionesViaje from "../data/opcionesViaje.json";
import { GRAPHQL_ENDPOINT, REST_BASE_URL } from "../graphql/endpoint";

const apigraphql = graphql.link(GRAPHQL_ENDPOINT);

export const handlers = [
  // 1) API REST Mock — Lista de destinos
  http.get(`${REST_BASE_URL}/destinos`, async ({ request }) => {
    await delay(700);
    const url = new URL(request.url);
    const error = url.searchParams.get("error");

    if (error === "404") {
      return HttpResponse.json(
        { message: "Destinos no encontrados" },
        { status: 404 },
      );
    }
    if (error === "500") {
      return HttpResponse.json(
        { message: "Error interno del servidor" },
        { status: 500 },
      );
    }

    return HttpResponse.json(destinos);
  }),

  // 2) API GraphQL Mock — Vuelos y hoteles de un destino específico
  apigraphql.query("ObtenerOpcionesDestino", async ({ variables }) => {
    await delay(700);

    if (variables?.simularError === "500") {
      return HttpResponse.json(
        {
          errors: [
            {
              message: "Error al consultar vuelos y hoteles en GraphQL",
              extensions: { code: "INTERNAL_SERVER_ERROR" },
            },
          ],
        },
        { status: 500 },
      );
    }

    if (variables?.simularError === "404") {
      return HttpResponse.json(
        {
          errors: [
            {
              message:
                "No se encontraron resultados para el destino especificado",
              extensions: { code: "NOT_FOUND" },
            },
          ],
        },
        { status: 404 },
      );
    }

    const opciones = opcionesViaje[String(variables?.destinoId)];

    if (!opciones) {
      return HttpResponse.json({
        data: {
          opcionesDestino: null,
        },
      });
    }

    return HttpResponse.json({
      data: {
        opcionesDestino: {
          vuelos: opciones.vuelos,
          hoteles: opciones.hoteles,
        },
      },
    });
  }),
];
