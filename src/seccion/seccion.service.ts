import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/config/db.config';
import { SeccionDto } from './dto/seccion.dto';
import { RowDataPacket } from 'mysql2';

@Injectable()
export class SeccionService {
  async obtenerSecciones(): Promise<SeccionDto[]> {
    const sql = 'SELECT codigo_seccion, nombre_seccion, orden FROM secciones ORDER BY orden';
    const connection = await dbConnection.getConnection();

    try {
      const [rows] = await connection.execute<RowDataPacket[]>(sql); // Indica explícitamente que es un array de RowDataPacket
      return rows.map((row) => ({
        codigo_seccion: row.codigo_seccion,
        nombre_seccion: row.nombre_seccion,
        orden: row.orden,
        items: [],
      })) as SeccionDto[];
    } finally {
      connection.release();
    }
  }

  async obtenerSeccionesPorPersona(codigoPersona: number): Promise<SeccionDto[]> {
    const sql = `
      SELECT s.codigo_seccion, s.nombre_seccion, s.orden,
             i.uuid_item, i.codigo_item, i.nombre, i.titulo, i.periodo, i.descripcion, i.url, i.nivel_progreso, i.eliminado
      FROM secciones s
      LEFT JOIN items i ON s.codigo_seccion = i.codigo_seccion
      WHERE i.codigo_persona = ?
      AND i.eliminado = 0
    `;
    const connection = await dbConnection.getConnection();

    try {
      const [rows] = await connection.execute<RowDataPacket[]>(sql, [codigoPersona]); // Indica explícitamente el tipo
      const seccionesMap = new Map<number, SeccionDto>();

      rows.forEach((row: any) => {
        if (!seccionesMap.has(row.codigo_seccion)) {
          seccionesMap.set(row.codigo_seccion, {
            codigo_seccion: row.codigo_seccion,
            nombre_seccion: row.nombre_seccion,
            orden: row.orden,
            items: [],
          });
        }

        if (row.codigo_item) {
          seccionesMap.get(row.codigo_seccion).items.push({
            uuid_item: row.uuid_item,
            codigo_item: row.codigo_item,
            nombre: row.nombre,
            titulo: row.titulo,
            periodo: row.periodo,
            descripcion: row.descripcion,
            url: row.url,
            nivel_progreso: row.nivel_progreso,
            codigo_persona: codigoPersona,
            codigo_seccion: row.codigo_seccion,
            eliminado: row.eliminado === 1,
          });
        }
      });

      return Array.from(seccionesMap.values());
    } finally {
      connection.release();
    }
  }
}


