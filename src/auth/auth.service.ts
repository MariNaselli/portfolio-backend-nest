import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dbConnection } from 'src/config/db.config';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}


  async signup(signupDto: SignupDto): Promise<string> {
    const { nombre, apellido, email, password } = signupDto;

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL para insertar el nuevo usuario
    const sql = `INSERT INTO personas (uuid, nombre, apellido, email, contraseña, url_foto) VALUES (UUID(), ?, ?, ?, ?, 'assets/images/profile.jpg')`;

    // SQL para verificar si el email ya existe
    const checkEmailSql = `SELECT email FROM personas WHERE email = ?`;

    const connection = await dbConnection.getConnection();

    try {
      // Verificar si el email ya está registrado
      const [emailExists]: any = await connection.execute(checkEmailSql, [
        email,
      ]);

      if (emailExists.length > 0) {
        throw new Error('El email ya está registrado');
      }

      // Insertar el nuevo usuario
      const [result]: any = await connection.execute(sql, [
        nombre,
        apellido,
        email,
        hashedPassword,
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Error al registrar el usuario');
      }

      return 'Usuario creado exitosamente'; // Mensaje de éxito
    } catch (error) {
      console.error('Error en el registro:', error.message);
      throw new Error(error.message || 'Error interno en el servidor');
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  // Método para iniciar sesión (login)
  async login(email: string, password: string): Promise<any> {
    const sql = 'SELECT * FROM personas WHERE email = ?';
    const connection = await dbConnection.getConnection();
    try {
      const [rows]: any = await connection.execute(sql, [email]);

      if (Array.isArray(rows) && rows.length > 0) {
        const user = rows[0];

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.contraseña);

        if (isPasswordValid) {
          // Si las contraseñas coinciden, generamos el token JWT
          const payload = { email: user.email, uuid: user.uuid };
          return {
            token: this.jwtService.sign(payload),
            uuid: user.uuid, // Devuelve el UUID del usuario logueado
            nombre: user.nombre,
            apellido: user.apellido,
            url_foto: user.url_foto
          }; // Retorna un objeto json con el token y el codigo de la persona
        } else {
          throw new UnauthorizedException('Credenciales inválidas');
        }
      } else {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    } finally {
      connection.release();
    }
  }
}
