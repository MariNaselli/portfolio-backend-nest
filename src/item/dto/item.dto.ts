import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({
    description: 'Código único del item',
    example: 1,
  })
  codigo_item: number;

  @ApiProperty({
    description: 'Nombre del item',
    example: 'Item 1',
  })
  nombre: string;

  @ApiProperty({
    description: 'Título del item',
    example: 'Mi primer item',
  })
  titulo: string;

  @ApiProperty({
    description: 'Periodo del item',
    example: '2023',
  })
  periodo: string;

  @ApiProperty({
    description: 'Descripción del item',
    example: 'Descripción del item',
  })
  descripcion: string;

  @ApiProperty({
    description: 'URL asociada al item',
    example: 'http://url.com',
  })
  url: string;

  @ApiProperty({
    description: 'Nivel de progreso del item',
    example: 50,
  })
  nivel_progreso: number;

  @ApiProperty({
    description: 'Código de la persona asociada al item',
    example: 123,
  })
  codigo_persona: number;

  @ApiProperty({
    description: 'Código de la sección asociada al item',
    example: 456,
  })
  codigo_seccion: number;

  @ApiProperty({
    description: 'Estado de eliminación del item',
    example: false,
  })
  eliminado: boolean;
}
