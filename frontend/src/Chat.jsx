import React, { useState } from 'react';
import { enviarMensaje } from './api';

export default function Chat() {
  const [input, setInput] = useState('');
  const [mensajes, setMensajes] = useState([
    { tipo: 'asistente', texto: '¡Hola! Soy tu asistente para gestionar estudiantes. ¿En qué puedo ayudarte?' }
  ]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError('');
    setMensajes((prev) => [...prev, { tipo: 'usuario', texto: input }]);
    try {
      const respuesta = await enviarMensaje(input);
      setMensajes((prev) => [...prev, { tipo: 'asistente', texto: respuesta }]);
    } catch (err) {
      setError(err.message);
    }
    setInput('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <ul style={styles.messageList}>
          {mensajes.map((m, i) => (
            <li key={i} style={{ ...styles.message, ...styles[m.tipo] }}>
              <b>{m.tipo === 'usuario' ? 'Vos' : 'Asistente'}:</b> {m.texto}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribí tu pregunta"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
      {error && <div style={styles.error}>Error: {error}</div>}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    fontFamily: '"Segoe UI", "Trebuchet MS", sans-serif',
    background: 'linear-gradient(to bottom right, #e7d8f5, #f9f0ff)',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(155, 89, 182, 0.3)',
    maxWidth: 600,
    margin: 'auto',
  },
  chatBox: {
    maxHeight: 400,
    overflowY: 'auto',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff8fc',
    borderRadius: '12px',
    border: '1px solid #dab1f1',
  },
  messageList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  message: {
    padding: '10px 14px',
    borderRadius: '14px',
    maxWidth: '80%',
    whiteSpace: 'pre-wrap',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  usuario: {
    backgroundColor: '#dcd0ff',
    color: '#4a0072',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  asistente: {
    backgroundColor: '#f3d3f7',
    color: '#2e003e',
    alignSelf: 'flex-start',
    marginRight: 'auto',
  },
  form: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
  },
  input: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 10,
    border: '1px solid #c299fc',
    fontSize: 16,
    backgroundColor: '#fdfbff',
    color: '#3c006b',
  },
  button: {
    padding: '10px 18px',
    borderRadius: 10,
    backgroundColor: '#9b59b6',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  error: {
    color: '#b00020',
    marginTop: 10,
    fontWeight: 'bold',
  },
};
