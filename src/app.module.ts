import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UsuariosModule, PortfolioModule, AuthModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
