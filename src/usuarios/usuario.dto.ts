import { ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @ApiProperty({ description: 'El nombre del usuario', example: 'Juan Pérez' })
  nombre: string;

  @ApiProperty({ description: 'La edad del usuario', example: 25 })
  edad: number;

  @ApiProperty({ description: 'El email del usuario', example: 'juan.perez@example.com' })
  email: string;
}

export class ActualizarUsuarioDto {
    @ApiProperty({ description: 'El nuevo nombre del usuario', example: 'Juan Pérez' })
    nombre?: string;
  
    @ApiProperty({ description: 'La nueva edad del usuario', example: 30 })
    edad?: number;
  
    @ApiProperty({ description: 'El nuevo email del usuario', example: 'juan.perez@nuevo.com' })
    email?: string;
  }