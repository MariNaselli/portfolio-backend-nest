import { ApiProperty } from '@nestjs/swagger';
import { ItemDto } from 'src/item/dto/item.dto';


export class SeccionDto {
  @ApiProperty({
    description: 'Código único de la sección',
    example: 1,
  })
  codigo_seccion: number;

  @ApiProperty({
    description: 'Nombre de la sección',
    example: 'Educación',
  })
  nombre_seccion: string;

  @ApiProperty({
    description: 'Orden de la sección',
    example: 1,
  })
  orden: number;

  @ApiProperty({
    description: 'Lista de ítems asociados a la sección',
    type: [ItemDto],
  })
  items: ItemDto[];
}

