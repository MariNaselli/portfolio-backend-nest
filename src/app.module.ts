import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuariosModule, PortfolioModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
