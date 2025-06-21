import React, { useState } from 'react';
import { enviarMensaje } from './api';

export default function Chat() {
  const [input, setInput] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajes([...mensajes, { tipo: 'usuario', texto: input }]);
    try {
      const respuesta = await enviarMensaje(input);
      setMensajes((prev) => [...prev, { tipo: 'asistente', texto: respuesta }]);
    } catch (err) {
      setError(err.message);
    }
    setInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribí tu pregunta"
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {mensajes.map((m, i) => (
          <li key={i} style={{ color: m.tipo === 'usuario' ? 'blue' : 'green' }}>
            <b>{m.tipo === 'usuario' ? 'Vos' : 'Asistente'}:</b> {m.texto}
          </li>
        ))}
      </ul>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
}