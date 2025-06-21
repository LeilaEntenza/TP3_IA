import React from 'react';
// filepath: frontend/src/App.jsx
import Chat from './Chat';
export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Chat con Asistente</h1>
      <Chat />
    </div>
  );
}