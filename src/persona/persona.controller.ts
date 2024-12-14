// persona.controller.ts
import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseInterceptors,
  Post,
  UploadedFile,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PersonaService } from './persona.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PersonaDto } from './dto/persona.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Request } from 'express';
import ImageKit from 'imagekit';

// import { Multer } from 'multer';

// @ApiTags('Personas')
@Controller('personas')
export class PersonaController {
  private imagekit: ImageKit;

  constructor(private readonly personaService: PersonaService) {
    this.imagekit = new ImageKit({
      publicKey: 'public_8RqY6bty2y/faHYCRRzpTqWBv+4=',
      privateKey: 'private_7WAgj70662L/wlbeSaaXfw3xCdQ=',
      urlEndpoint: 'https://ik.imagekit.io/w1y9lfcha/',
    });
  }

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
  async obtenerPersonaPorCodigo(
    @Param('uuid') uuid: string,
  ): Promise<PersonaDto> {
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
  @UseInterceptors(FileInterceptor('foto'))
  async subirFoto(
    @Param('uuid') uuid: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new HttpException(
        'No se ha subido una foto',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    try {
      // Obtener la persona y la información de la foto actual
      const persona = await this.personaService.obtenerPersonaPorCodigo(uuid);
      const fileIdAnterior = persona.fileIdFoto; // Asumiendo que guardas el fileId en la BD
  
      // Subir la nueva imagen a ImageKit
      const response = await this.imagekit.upload({
        file: file.buffer, // Buffer del archivo recibido
        fileName: `${uuid}.png`, // Nombre que tendrá en ImageKit
        folder: '/portfolio-web/uploads', // Carpeta en ImageKit (opcional)
      });
  
      // Eliminar la imagen anterior en ImageKit, si existe
      if (fileIdAnterior) {
        await this.imagekit.deleteFile(fileIdAnterior);
      }
  
      // Guardar el nuevo fileId y URL en la base de datos
      const urlFoto = response.url;
      const nuevoFileId = response.fileId; // ID único de la imagen en ImageKit
      await this.personaService.actualizarFotoPersona(uuid, urlFoto, nuevoFileId);
  
      return { urlFotoActualizada: urlFoto };
    } catch (error) {
      throw new HttpException(
        `Error al manejar la imagen: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}
