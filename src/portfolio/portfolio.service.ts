import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/config/db.config';

@Injectable()
export class PortfolioService {
  constructor() {}

  async obtenerPortfolioPorCodigoPersona(codigoPersona: number) {
    const sql = `
      SELECT
        p.codigo AS codigo_persona, p.nombre AS nombre_persona, p.apellido, p.titulo AS titulo_persona,
        p.descripcion AS descripcion_persona, p.email, p.telefono, p.ubicacion, p.url_instagram,
        p.url_github, p.url_linkedin, p.url_foto,
        s.codigo_seccion, s.nombre_seccion, s.orden,
        i.codigo_item, i.nombre AS nombre_item, i.titulo AS titulo_item, i.periodo,
        i.descripcion AS descripcion_item, i.url, i.nivel_progreso, i.eliminado
      FROM secciones s
      INNER JOIN items i ON s.codigo_seccion = i.codigo_seccion
      INNER JOIN personas p ON p.codigo = i.codigo_persona
      WHERE i.codigo_persona = ?
        AND i.eliminado = 0
    `;

    const connection = await dbConnection.getConnection();
    try {
      const [rows]: [any[], any] = await connection.execute(sql, [
        codigoPersona,
      ]);
      const seccionesMap = new Map<number, any>();
      let persona = null;

      for (const row of rows) {
        if (!persona) {
          persona = {
            codigo: row.codigo_persona,
            nombre: row.nombre_persona,
            apellido: row.apellido,
            titulo: row.titulo_persona,
            descripcion: row.descripcion_persona,
            email: row.email,
            telefono: row.telefono,
            ubicacion: row.ubicacion,
            urlInstagram: row.url_instagram,
            urlGithub: row.url_github,
            urlLinkedin: row.url_linkedin,
            urlFoto: row.url_foto,
          };
        }

        const codigo_seccion = row.codigo_seccion;
        if (!seccionesMap.has(codigo_seccion)) {
          seccionesMap.set(codigo_seccion, {
            codigo_seccion,
            nombre_seccion: row.nombre_seccion,
            orden: row.orden,
            items: [],
          });
        }

        seccionesMap.get(codigo_seccion).items.push({
          codigo_item: row.codigo_item,
          nombre: row.nombre_item,
          titulo: row.titulo_item,
          periodo: row.periodo,
          descripcion: row.descripcion_item,
          url: row.url,
          nivel_progreso: row.nivel_progreso,
          codigo_seccion: codigo_seccion,
          codigo_persona: persona.codigo
        });
      }

      const secciones = Array.from(seccionesMap.values());
      secciones.sort((a, b) => a.orden - b.orden);

      return persona ? { persona, secciones } : null;
    } finally {
      connection.release();
    }
  }
}
