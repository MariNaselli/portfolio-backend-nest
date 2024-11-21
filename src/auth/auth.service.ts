import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly hardcodedUser = {
    email: 'nasellimariana@gmail.com',
    password: 'Cv7Y6mmzKecrbEc',
  };

  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string): Promise<string | null> {
    if (
      username === this.hardcodedUser.email &&
      password === this.hardcodedUser.password
    ) {
      const payload = { username };
      return this.jwtService.sign(payload); // Genera el token JWT
    }
    return null; // Credenciales inválidas
  }
}







