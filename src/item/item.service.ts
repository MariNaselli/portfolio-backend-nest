import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/config/db.config';

@Injectable()
export class ItemService {

  // Crear un nuevo item
  async crearItem(item: any): Promise<any> {
    const sql = `
      INSERT INTO items (uuid_item, nombre, titulo, periodo, descripcion, url, nivel_progreso, codigo_persona, codigo_seccion, eliminado)
      VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `;
    
    const params = [
      item.nombre,
      item.titulo,
      item.periodo,
      item.descripcion,
      item.url,
      item.nivel_progreso,
      item.codigo_persona,
      item.codigo_seccion,
    ];

    const connection = await dbConnection.getConnection();
    try {
      const [result] = await connection.execute(sql, params);
      return result; // Retorna el resultado de la consulta
    } finally {
      connection.release();
    }
  }

  // Obtener todos los items
  async obtenerItems(): Promise<any> {
    const sql = 'SELECT * FROM items WHERE eliminado = 0';
    
    const connection = await dbConnection.getConnection();
    try {
      const [rows] = await connection.execute(sql);
      console.log('Datos obtenidos del backend:', rows); // Agrega este console.log
      return Array.isArray(rows) ? rows : []; // Verificamos si 'rows' es un arreglo
    } finally {
      connection.release();
    }
  }

  // Obtener un item por su código
  async obtenerItemPorCodigo(uuid_item: string): Promise<any> {
    const sql = 'SELECT * FROM items WHERE uuid_item = ?';
    
    const connection = await dbConnection.getConnection();
    try {
      const [rows] = await connection.execute(sql, [uuid_item]);
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null; // Aseguramos que 'rows' es un arreglo
    } finally {
      connection.release();
    }
  }

  // Actualizar un item por su código
  async actualizarItem(uuid_item: string, item: any): Promise<any> {
    const sql = `
      UPDATE items SET 
      nombre = ?, 
      titulo = ?, 
      periodo = ?, 
      descripcion = ?, 
      url = ?, 
      nivel_progreso = ?, 
      codigo_seccion = ? 
      WHERE uuid_item = ?
    `;
    
    const params = [
      item.nombre,
      item.titulo,
      item.periodo,
      item.descripcion,
      item.url,
      item.nivel_progreso,
      item.codigo_seccion,
      uuid_item
    ];

    console.log('Parámetros enviados a la consulta:', params);

    const connection = await dbConnection.getConnection();
  try {
    const [result] = await connection.execute(sql, params);
    return result;
  } catch (error) {
    console.error('Error al actualizar el item:', error); // Agrega un log del error
    throw new Error('Error al ejecutar la consulta de actualización.');
  } finally {
    connection.release();
  }
  }

  // Eliminar un item por su código
  async eliminarItem(uuid_item: string): Promise<any> {
    const sql = 'UPDATE items SET eliminado = 1 WHERE uuid_item = ?';

    const connection = await dbConnection.getConnection();
    try {
      const [result] = await connection.execute(sql, [uuid_item]);
      return result; // Retorna el resultado de la eliminación
    } finally {
      connection.release();
    }
  }
}






