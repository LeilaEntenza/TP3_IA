import { elAgente } from "../src/main.js";

export async function runAgente(mensaje) {
  const respuesta = await elAgente.chat(mensaje);
  console.log("Respuesta del agente:", respuesta);
  return respuesta;
}