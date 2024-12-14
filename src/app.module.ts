import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { SeccionModule } from './seccion/seccion.module';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [UsuariosModule, PortfolioModule, AuthModule, ItemModule, SeccionModule, PersonaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
