import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { of } from 'rxjs';
import { dbConnection } from 'src/config/db.config'; 
@Injectable()
export class AuthService {
  private readonly hardcodedUser = {
    email: 'nasellimariana@gmail.com',
    password: 'Cv7Y6mmzKecrbEc',
  };

  constructor(private readonly jwtService: JwtService) {}

  // async login(username: string, password: string): Promise<string | null> {
  //   if (
  //     username === this.hardcodedUser.email &&
  //     password === this.hardcodedUser.password
  //   ) {
  //     const payload = { username };
  //     return this.jwtService.sign(payload); // Genera el token JWT
  //   }
  //   return null; // Credenciales inválidas
  // }

  async login(email: string, password: string): Promise<string> {
    const sql = 'SELECT * FROM personas WHERE email = ? AND contraseña = ?';
    const connection = await dbConnection.getConnection();
    try {
      const [rows]: any = await connection.execute(sql, [email, password]);

      if (Array.isArray(rows) && rows.length > 0) {
        // Usuario encontrado, generamos un token JWT
        const user = rows[0]; // Obtener datos del usuario si es necesario
        const payload = { email: user.email, id: user.id }; // Payload para el token
        return this.jwtService.sign(payload); // Retorna el token generado
      }
    } finally {
      connection.release();
    }
  }
}







