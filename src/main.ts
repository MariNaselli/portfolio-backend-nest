import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Documentación de la API del portfolio')
    .setVersion('1.0')
    .addTag('portfolio') // Opcional: Define un tag
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitar CORS con configuración básica
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir solicitudes desde Angular
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
  });

   // Activa las validaciones globales con ValidationPipe
   app.useGlobalPipes(new ValidationPipe());

   // Servir la carpeta 'uploads' como estática
  // La ruta base para los archivos será '/uploads/{filename}'
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();
