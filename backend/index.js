import express from "express";
import cors from "cors";
import { runAgente } from "./agent.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { mensaje } = req.body;
  try {
    const respuesta = await runAgente(mensaje);
    res.json({ respuesta });
  } catch (error) {
    console.error("ERROR EN /api/chat:", error); 
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});