import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({
    secret: 'tu_clave_secreta',  // La misma clave secreta que usas para firmar el JWT
    signOptions: { expiresIn: '1h' },  // El token expirará en 1 hora
  })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

