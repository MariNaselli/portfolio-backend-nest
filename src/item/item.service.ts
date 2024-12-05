import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/config/db.config';

@Injectable()
export class ItemService {

  // Crear un nuevo item
  async crearItem(item: any): Promise<any> {
    const sql = `
      INSERT INTO items (nombre, titulo, periodo, descripcion, url, nivel_progreso, codigo_persona, codigo_seccion, eliminado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
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
  async obtenerItemPorCodigo(codigo: number): Promise<any> {
    const sql = 'SELECT * FROM items WHERE codigo = ?';
    
    const connection = await dbConnection.getConnection();
    try {
      const [rows] = await connection.execute(sql, [codigo]);
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null; // Aseguramos que 'rows' es un arreglo
    } finally {
      connection.release();
    }
  }

  // Actualizar un item por su código
  async actualizarItem(codigo_item: number, item: any): Promise<any> {
    const sql = `
      UPDATE items SET 
      nombre = ?, 
      titulo = ?, 
      periodo = ?, 
      descripcion = ?, 
      url = ?, 
      nivel_progreso = ?, 
      codigo_persona = ?, 
      codigo_seccion = ? 
      WHERE codigo_item = ?
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
      codigo_item,
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
  async eliminarItem(codigo: number): Promise<any> {
    const sql = 'UPDATE items SET eliminado = 1 WHERE codigo_item = ?';

    const connection = await dbConnection.getConnection();
    try {
      const [result] = await connection.execute(sql, [codigo]);
      return result; // Retorna el resultado de la eliminación
    } finally {
      connection.release();
    }
  }
}






