import { readFileSync, writeFileSync } from 'fs';

const DATA_FILE = './data/alumnos.json';

class Estudiantes {
  constructor() {
    this.estudiantes = [];
  }

  cargarEstudiantesDesdeJson() {
    try {
      const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
      this.estudiantes = data.alumnos || [];
    } catch (e) {
      console.error("Error al leer el archivo de datos:", e);
    }
  }

  guardarEstudiantes() {
    try {
      writeFileSync(DATA_FILE, JSON.stringify({ alumnos: this.estudiantes }, null, 2));
      this.cargarEstudiantesDesdeJson();
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
