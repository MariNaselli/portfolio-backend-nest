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

  @Get('obtener-item/:codigo')
  @ApiOperation({ summary: 'Obtener un item por su código' })
  @ApiParam({ name: 'codigo', description: 'Código del item' }) // Decorador para el parámetro en la URL
  @ApiResponse({ status: 200, description: 'Item encontrado.', type: ItemDto })
  @ApiResponse({ status: 404, description: 'Item no encontrado.' })
  async obtenerItemPorCodigo(@Param('codigo') codigo: number): Promise<ItemDto> {
    return this.itemService.obtenerItemPorCodigo(codigo);
  }

  @Put('actualizar-item/:codigo_item')
  @ApiOperation({ summary: 'Actualizar un item existente' })
  @ApiParam({ name: 'codigo', description: 'Código del item a actualizar' })
  @ApiResponse({ status: 200, description: 'Item actualizado exitosamente.', type: ItemDto })
  @ApiResponse({ status: 404, description: 'Item no encontrado.' })
  async actualizarItem(
    @Param('codigo_item') codigo_item: number,
    @Body() item: ItemDto
  ): Promise<ItemDto> {
    return this.itemService.actualizarItem(codigo_item, item);
  }

  @Delete('eliminar-item/:codigo')
  @ApiOperation({ summary: 'Eliminar un item por su código' })
  @ApiParam({ name: 'codigo', description: 'Código del item a eliminar' })
  @ApiResponse({ status: 200, description: 'Item eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Item no encontrado.' })
  async eliminarItem(@Param('codigo') codigo: number): Promise<void> {
    return this.itemService.eliminarItem(codigo);
  }
}
