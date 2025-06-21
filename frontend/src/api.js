export async function enviarMensaje(mensaje) {
  const res = await fetch('http://localhost:3001/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error desconocido');
  }
  const data = await res.json();
  return data.respuesta;
}