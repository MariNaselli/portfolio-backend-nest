import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/config/db.config';

@Injectable()
export class PortfolioService {
  constructor() {}

  async obtenerPortfolioPorCodigoPersona(uuid: string) {
    const sqlPersona = `
        SELECT uuid, nombre, apellido, titulo, descripcion, email, 
        telefono, ubicacion, url_instagram, url_github, url_linkedin, url_foto
      FROM personas
      WHERE uuid = ?
    `;

    //la consulta me trae el portfolio por uuid

    const sqlSecciones = `
       SELECT
        s.codigo_seccion, s.nombre_seccion,
        i.uuid_item, i.codigo_item, i.nombre AS nombre_item, i.titulo AS titulo_item, i.periodo,
        i.descripcion AS descripcion_item, i.url, i.nivel_progreso
      FROM secciones s
      LEFT JOIN items i ON s.codigo_seccion = i.codigo_seccion AND i.eliminado = 0
      LEFT JOIN personas p ON p.codigo = i.codigo_persona
      WHERE p.uuid = ?
      ORDER BY s.orden;
      
    `;

    const connection = await dbConnection.getConnection();
    try {
      // Consulta la información de la persona
      const [personaRows]: [any[], any] = await connection.execute(sqlPersona, [
        uuid,
      ]);
      if (personaRows.length === 0) {
        return null; // Retorna null si la persona no existe
      }

      const persona = {
        uuid: personaRows[0].uuid,
        nombre: personaRows[0].nombre,
        apellido: personaRows[0].apellido,
        titulo: personaRows[0].titulo,
        descripcion: personaRows[0].descripcion,
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
        uuid,
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
            uuid_item: row.uuid_item,
            codigo_item: row.codigo_item,
            nombre: row.nombre_item,
            titulo: row.titulo_item,
            periodo: row.periodo,
            descripcion: row.descripcion_item,
            url: row.url,
            nivel_progreso: row.nivel_progreso,
            codigo_seccion: codigo_seccion
          });
        }
      }

      const secciones = Array.from(seccionesMap.values());
      secciones.sort((a, b) => a.orden - b.orden);
  
      return { persona, secciones }; // Objeto final
    } catch (error) {
      console.error('Error en obtenerPortfolioPorCodigoPersona:', error.message);
      throw new Error(error.message);
    } finally {
      connection.release();
    }
  }
}
