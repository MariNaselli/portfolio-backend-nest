import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Carpeta donde se guardarán las imágenes
    }),
  ],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule {}
