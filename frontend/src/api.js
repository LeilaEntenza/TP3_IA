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
  return data.respuesta;
}