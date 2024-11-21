import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { dbConnection } from 'src/config/db.config'; // Tu conexión a la base de datos

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'tu_clave_secreta',  // La misma clave secreta que usas para firmar el JWT
    });
  }

  async validate(payload: any) {
    // Valida que el usuario existe en la base de datos
    const connection = await dbConnection.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [payload.userId]);
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];  // Retorna el usuario si es válido
      }
      return null;
    } finally {
      connection.release();
    }
  }
}
