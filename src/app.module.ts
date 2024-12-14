import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { SeccionModule } from './seccion/seccion.module';
import { PersonaModule } from './persona/persona.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigModule esté disponible en toda la aplicación
      envFilePath: '.env', // Ruta al archivo .env (opcional, por defecto busca en la raíz)
    }),
    UsuariosModule,
    PortfolioModule,
    AuthModule,
    ItemModule,
    SeccionModule,
    PersonaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
