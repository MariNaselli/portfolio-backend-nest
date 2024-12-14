import { ApiProperty } from '@nestjs/swagger';

export class PersonaDto {
  @ApiProperty({
    description: 'UUID único de la persona',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  uuid: string;

  @ApiProperty({
    description: 'Nombre de la persona',
    example: 'Juan',
  })
  nombre: string;

  @ApiProperty({
    description: 'Apellido de la persona',
    example: 'Pérez',
  })
  apellido: string;

  @ApiProperty({
    description: 'Título profesional de la persona',
    example: 'Ingeniero de Software',
  })
  titulo: string;

  @ApiProperty({
    description: 'Descripción breve de la persona',
    example: 'Desarrollador Fullstack con experiencia en Angular y NestJS',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Correo electrónico de la persona',
    example: 'juan.perez@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+34 123 456 789',
  })
  telefono: string;

  @ApiProperty({
    description: 'Ubicación geográfica',
    example: 'Madrid, España',
  })
  ubicacion: string;

  @ApiProperty({
    description: 'URL de Instagram de la persona',
    example: 'https://instagram.com/juanperez',
  })
  urlInstagram: string;

  @ApiProperty({
    description: 'URL de GitHub de la persona',
    example: 'https://github.com/juanperez',
  })
  urlGithub: string;

  @ApiProperty({
    description: 'URL de LinkedIn de la persona',
    example: 'https://linkedin.com/in/juanperez',
  })
  urlLinkedin: string;

  @ApiProperty({
    description: 'Contraseña de la persona',
    example: 'securepassword123',
  })
  contrasena: string;

  @ApiProperty({
    description: 'URL de la foto de perfil',
    example: 'https://example.com/photo.jpg',
  })
  urlFoto: string;
}

