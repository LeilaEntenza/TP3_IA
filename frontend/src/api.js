export async function enviarMensaje(mensaje) {
  const response = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje }),
  });
  if (!response.ok) {
    throw new Error('Error en la respuesta del servidor');
  }
  const data = await response.json();
  return limpiarRespuesta(data.respuesta.data.result);
}

// Función para limpiar el bloque <think>...</think>
function limpiarRespuesta(respuesta) {
  const partes = respuesta.split('</think>');
  if (partes.length > 1) {
    return partes[1].trim();
  }
  return respuesta.trim();
}