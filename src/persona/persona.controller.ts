// persona.controller.ts
import { Controller, Get, Param, Put, Body } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PersonaDto } from './dto/persona.dto';

// @ApiTags('Personas')
@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get('listar-personas')
  @ApiOperation({ summary: 'Listar todas las personas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personas obtenida correctamente.',
    type: [PersonaDto],
  })
  async listarPersonas(): Promise<PersonaDto[]> {
    return this.personaService.listarPersonas();
  }

  @Get('obtener-persona/:uuid')
  @ApiOperation({ summary: 'Obtener una persona por su código' })
  @ApiParam({ name: 'uuid', description: 'Código de la persona a buscar' })
  @ApiResponse({
    status: 200,
    description: 'Persona encontrada exitosamente.',
    type: PersonaDto,
  })
  @ApiResponse({ status: 404, description: 'Persona no encontrada.' })
  async obtenerPersonaPorCodigo(@Param('uuid') uuid: string): Promise<PersonaDto> {
    return this.personaService.obtenerPersonaPorCodigo(uuid);
  }

  @Put('actualizar-persona')
  @ApiOperation({ summary: 'Actualizar una persona' })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada exitosamente.',
    type: PersonaDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos proporcionados.',
  })
  async actualizarPersona(@Body() personaDto: PersonaDto): Promise<PersonaDto> {
    return this.personaService.actualizarPersona(personaDto);
  }
}
