import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ItemDto } from './dto/item.dto';

// @ApiTags('Items')  // Esto es lo que categoriza la ruta en Swagger
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('crear-item')
  @ApiOperation({ summary: 'Crear un nuevo item' })
  @ApiResponse({ status: 201, description: 'Item creado exitosamente.', type: ItemDto })
  @ApiResponse({ status: 400, description: 'Error en la creación del item.' })
  async crearItem(@Body() item: ItemDto): Promise<ItemDto> {
    return this.itemService.crearItem(item);
  }

  @Get('obtener-items')
  @ApiOperation({ summary: 'Obtener todos los items' })
  @ApiResponse({ status: 200, description: 'Lista de items obtenida correctamente.', type: [ItemDto] })
  async obtenerItems(): Promise<ItemDto[]> {
    return this.itemService.obtenerItems();
  }

  @Get('obtener-item/:uuid_item')
  @ApiOperation({ summary: 'Obtener un item por su uuid_item' })
  @ApiParam({ name: 'uuid_item', description: 'Código uuid_item' }) // Decorador para el parámetro en la URL
  @ApiResponse({ status: 200, description: 'Item encontrado.', type: ItemDto })
  @ApiResponse({ status: 404, description: 'Item no encontrado.' })
  async obtenerItemPorCodigo(@Param('uuid_item') uuid_item: string): Promise<ItemDto> {
    return this.itemService.obtenerItemPorCodigo(uuid_item);
  }

  @Put('actualizar-item/:uuid_item')
  @ApiOperation({ summary: 'Actualizar un item existente' })
  @ApiParam({ name: 'uuid_item', description: 'Uuid_item a actualizar' })
  @ApiResponse({ status: 200, description: 'Item actualizado exitosamente.', type: ItemDto })
  @ApiResponse({ status: 404, description: 'Item no encontrado.' })
  async actualizarItem(
    @Param('uuid_item') uuid_item: string,
    @Body() item: ItemDto
  ): Promise<ItemDto> {
    
    return this.itemService.actualizarItem(uuid_item, item);
  }

  @Delete('eliminar-item/:uuid_item')
  @ApiOperation({ summary: 'Eliminar un item por su uuid_item' })
  @ApiParam({ name: 'uuid_item', description: 'Uuid_item a eliminar' })
  @ApiResponse({ status: 200, description: 'Item eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Item no encontrado.' })
  async eliminarItem(@Param('uuid_item') uuid_item: string): Promise<void> {
    return this.itemService.eliminarItem(uuid_item);
  }
}
