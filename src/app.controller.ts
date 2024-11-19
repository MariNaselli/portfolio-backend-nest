import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';


class MensajeDto {
  @ApiProperty({
    description: 'El contenido del mensaje que será enviado al servidor',
    example: 'Hola, este es un mensaje de prueba',
  })
  contenido: string;
}

export class ActualizarDto {
  @ApiProperty({
    description: 'El nuevo nombre que deseas asignar al usuario',
    example: 'Juan Pérez',
  })
  nuevoNombre: string;
}

@ApiTags("AppController")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/saludar")
  @ApiOperation({ summary: 'Método get para probar la api' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/saludo')
  @ApiOperation({ summary: 'Devuelve un saludo según el idioma especificado' })
  getGreeting(@Query('idioma') idioma: string): string {
    if (idioma === 'es') return 'Hola!';
    if (idioma === 'en') return 'Hello!';
    if (idioma === 'fr') return 'Bonjour!';
    return 'Hola! (idioma predeterminado)';
  }

  @Post('/mensaje')
  @ApiOperation({ summary: 'Recibe un mensaje en el body y lo responde' })
  recibirMensaje(@Body() mensaje: MensajeDto): string {
    return `Recibí tu mensaje: ${mensaje.contenido}`;
  }

  @Put('/usuario/:id')
  @ApiOperation({ summary: 'Actualiza el nombre de un usuario por su ID' })
  actualizarUsuario(
    @Param('id') id: number,
    @Body() datos: ActualizarDto,
  ): string {
    return `Usuario con ID ${id} actualizado a: ${datos.nuevoNombre}`;
  }

}
