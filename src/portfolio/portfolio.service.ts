import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/config/db.config';

@Injectable()
export class PortfolioService {
  constructor() {}

  async obtenerPortfolioPorCodigoPersona(codigoPersona: number) {
    const sqlPersona = `
      SELECT
        codigo AS codigo_persona, nombre AS nombre_persona, apellido, titulo AS titulo_persona,
        descripcion AS descripcion_persona, email, telefono, ubicacion, url_instagram,
        url_github, url_linkedin, url_foto
      FROM personas
      WHERE codigo = ?
    `;

    const sqlSecciones = `
      SELECT
        s.codigo_seccion, s.nombre_seccion, s.orden,
        i.codigo_item, i.nombre AS nombre_item, i.titulo AS titulo_item, i.periodo,
        i.descripcion AS descripcion_item, i.url, i.nivel_progreso, i.eliminado
      FROM secciones s
      LEFT JOIN items i ON s.codigo_seccion = i.codigo_seccion AND i.eliminado = 0
      WHERE i.codigo_persona = ?
      AND i.eliminado = 0
    `;

    const connection = await dbConnection.getConnection();
    try {
      // Consulta la información de la persona
      const [personaRows]: [any[], any] = await connection.execute(sqlPersona, [
        codigoPersona,
      ]);
      if (personaRows.length === 0) {
        return null; // Retorna null si la persona no existe
      }

      const persona = {
        codigo: personaRows[0].codigo_persona,
        nombre: personaRows[0].nombre_persona,
        apellido: personaRows[0].apellido,
        titulo: personaRows[0].titulo_persona,
        descripcion: personaRows[0].descripcion_persona,
        email: personaRows[0].email,
        telefono: personaRows[0].telefono,
        ubicacion: personaRows[0].ubicacion,
        urlInstagram: personaRows[0].url_instagram,
        urlGithub: personaRows[0].url_github,
        urlLinkedin: personaRows[0].url_linkedin,
        urlFoto: personaRows[0].url_foto,
      };

      // Consulta las secciones e items
      const [seccionesRows]: [any[], any] = await connection.execute(sqlSecciones, [
        codigoPersona,
      ]);

      // Construye el mapa de secciones
      const seccionesMap = new Map<number, any>();
      for (const row of seccionesRows) {
        const codigo_seccion = row.codigo_seccion;

        if (!seccionesMap.has(codigo_seccion)) {
          seccionesMap.set(codigo_seccion, {
            codigo_seccion,
            nombre_seccion: row.nombre_seccion,
            orden: row.orden,
            items: [],
          });
        }

        if (row.codigo_item) {
          seccionesMap.get(codigo_seccion).items.push({
            codigo_item: row.codigo_item,
            nombre: row.nombre_item,
            titulo: row.titulo_item,
            periodo: row.periodo,
            descripcion: row.descripcion_item,
            url: row.url,
            nivel_progreso: row.nivel_progreso,
          });
        }
      }

      const secciones = Array.from(seccionesMap.values());
      secciones.sort((a, b) => a.orden - b.orden);

      // Retorna el objeto final
      return { persona, secciones };
    } finally {
      connection.release();
    }
  }
}
