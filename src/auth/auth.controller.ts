import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
  ): Promise<any> {
    const response = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    if (!response) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return response;
  }

  // Endpoint para el signup
  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<any> {
    const message = await this.authService.signup(signupDto);
    return { success: true, message }; // Respuesta exitosa
  }
}
