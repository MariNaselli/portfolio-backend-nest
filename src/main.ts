import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Main');

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('Documentación de la API del portfolio')
    .setVersion('1.0')
    .addTag('portfolio') // Opcional: Define un tag
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Leer orígenes desde variables de entorno y dividirlos en un array
  const allowedOrigins = configService.get<string>('CORS_ORIGINS')?.split(',') || [];
  logger.log('allowedOrigins: ' + allowedOrigins);

  // Habilitar CORS con configuración basada en variables de entorno
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos
  });

  // Activa las validaciones globales con ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Servir la carpeta 'uploads' como estática
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();
