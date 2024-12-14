import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // Configuración para almacenar en memoria
    }),
  ],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
