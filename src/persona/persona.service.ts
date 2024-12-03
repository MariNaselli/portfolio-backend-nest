// persona.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { dbConnection } from 'src/config/db.config';  // Configuración de conexión
import { PersonaDto } from './dto/persona.dto';

@Injectable()
export class PersonaService {
  // Listar todas las personas
  async listarPersonas(): Promise<PersonaDto[]> {
    const sql = 'SELECT * FROM personas';
    const connection = await dbConnection.getConnection();
    try {
      const [rows] = await connection.execute(sql);
      return rows as PersonaDto[];
    } finally {
      connection.release();
    }
  }

  // Obtener una persona por su código
  async obtenerPersonaPorCodigo(codigo: number): Promise<PersonaDto> {
    const sql = 'SELECT * FROM personas WHERE codigo = ?';
    const connection = await dbConnection.getConnection();
    try {
      const [rows] = await connection.execute(sql, [codigo]);
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as PersonaDto;
      } else {
        throw new NotFoundException(`Persona con código ${codigo} no encontrada.`);
      }
    } finally {
      connection.release();
    }
  }

  
  // Actualizar una persona
  async actualizarPersona(personaDto: PersonaDto): Promise<PersonaDto> {
    
    const { codigo } = personaDto; // El código se obtiene del DTO directamente

    const sql = `
      UPDATE personas SET 
        nombre = ?, 
        apellido = ?, 
        titulo = ?, 
        descripcion = ?, 
        email = ?, 
        telefono = ?, 
        ubicacion = ?, 
        url_instagram = ?, 
        url_github = ?, 
        url_linkedin = ?, 
        url_foto = ? 
      WHERE codigo = ?
    `;

    const params = [
      personaDto.nombre,
      personaDto.apellido,
      personaDto.titulo,
      personaDto.descripcion,
      personaDto.email,
      personaDto.telefono,
      personaDto.ubicacion,
      personaDto.urlInstagram,
      personaDto.urlGithub,
      personaDto.urlLinkedin,
      personaDto.urlFoto,
      codigo,
    ];

    const connection = await dbConnection.getConnection();
    try {
      const [result]: any = await connection.execute(sql, params);

      if (result.affectedRows === 0) {
        throw new NotFoundException(`Persona con código ${codigo} no encontrada.`);
      }

      return { ...personaDto, codigo };
    } finally {
      connection.release();
    }
  }
}
