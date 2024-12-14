import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: 'Nombre de la persona', example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ description: 'Apellido de la persona', example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'juan.perez@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Contraseña', example: 'SecurePassword123' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
    { message: 'La contraseña debe incluir una letra mayúscula, una minúscula, un número y un carácter especial.' })
  @IsNotEmpty()
  password: string;

//   @ApiProperty({ description: 'Confirmación de la contraseña', example: 'SecurePassword123' })
//   @IsString()
//   @IsNotEmpty()
//   confirmPassword: string;
}
