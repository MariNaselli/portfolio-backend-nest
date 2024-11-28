import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeccionService } from './seccion.service';
import { SeccionDto } from './dto/seccion.dto';


@Controller('secciones')
export class SeccionController {
  constructor(private readonly seccionService: SeccionService) {}

  @Get('obtener-secciones')
  @ApiOperation({ summary: 'Obtener todas las secciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de secciones obtenida correctamente.',
    type: [SeccionDto],
  })
  async obtenerSecciones(): Promise<SeccionDto[]> {
    return this.seccionService.obtenerSecciones();
  }

  @Get('obtener-secciones/:codigoPersona')
  @ApiOperation({ summary: 'Obtener secciones con ítems para una persona' })
  @ApiResponse({
    status: 200,
    description: 'Lista de secciones con ítems obtenida correctamente.',
    type: [SeccionDto],
  })
  async obtenerSeccionesPorPersona(
    @Param('codigoPersona') codigoPersona: number,
  ): Promise<SeccionDto[]> {
    return this.seccionService.obtenerSeccionesPorPersona(codigoPersona);
  }
}
