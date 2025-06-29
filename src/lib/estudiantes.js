import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../data/alumnos.json');

class Estudiantes {
  constructor() {
    this.estudiantes = [];
  }

cargarEstudiantesDesdeJson() {
  try {
    console.log("Leyendo:", DATA_FILE);
    const contenido = readFileSync(DATA_FILE, 'utf-8');
    console.log("Contenido:", contenido);
    const data = JSON.parse(contenido);
    this.estudiantes = data.alumnos || [];
    console.log("Alumnos en memoria:", this.estudiantes);
  } catch (e) {
    console.error("ERROR leyendo alumnos.json", e);
  }
}

  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
      // NO volver a cargar desde disco aquí, solo guardar.
    } catch (e) {
      console.error("Error al guardar los estudiantes:", e);
      throw new Error("No se pudo guardar la lista de estudiantes.");
    }
  }

  agregarEstudiante({ nombre, apellido, curso }) {
    const existe = this.estudiantes.some(
      e =>
        e.nombre.toLowerCase() === nombre.toLowerCase() &&
        e.apellido.toLowerCase() === apellido.toLowerCase() &&
        e.curso.toLowerCase() === curso.toLowerCase()
    );
    if (existe) return false;
    this.estudiantes.push({ nombre, apellido, curso });
    this.guardarEstudiantes();
    return true;
  }

  buscarPorNombre(nombre) {
    return this.estudiantes.filter(
      e => e.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  buscarPorApellido(apellido) {
    return this.estudiantes.filter(
      e => e.apellido.toLowerCase().includes(apellido.toLowerCase())
    );
  }

  listarEstudiantes() {
    return this.estudiantes;
  }
}

export { Estudiantes };