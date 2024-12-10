// persona.controller.ts
import { Controller, Get, Param, Put, Body, UseInterceptors, Post, UploadedFile } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PersonaDto } from './dto/persona.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
// import { Multer } from 'multer'; 

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

  @Post(':uuid/foto')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads', // Carpeta donde se guardan las fotos
        filename: (_req, file, callback) => {
           // Usar el UUID de la persona para nombrar el archivo
           const uuid = _req.params.uuid;  // Obtener el UUID de la URL
           const fileExtension = file.originalname.split('.').pop();
           const filename = `${uuid}.${fileExtension}`;
           callback(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Limitar a 5MB
      },
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);
        
        if (extname && mimeType) {
          return callback(null, true); // Aceptar el archivo
        } else {
          return callback(null, false); // Rechazar el archivo
        }
      },
    }),
  )
  async subirFoto(
    @Param('uuid') uuid: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No se ha subido una foto');
    }

    const urlFoto = `http://localhost:3000/uploads/${file.filename}?t=${Date.now()}`;
    await this.personaService.actualizarFotoPersona(uuid, urlFoto);

    return { urlFotoActualizada: urlFoto };
  }


}
