import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { ActualizarUsuarioDto, CrearUsuarioDto } from './usuario.dto';

@ApiTags('Usuarios')
@Controller()
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get('/usuarios')
    @ApiOperation({ summary: 'Listar todos los usuarios' })
    listarUsuarios() {
        return this.usuariosService.listarUsuarios();
  }

  @Get('/usuario/:id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  obtenerUsuarioPorId(@Param('id') id: number) {
    return this.usuariosService.obtenerUsuarioPorId(Number(id));
  }

  @Post('nuevo-usuario')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  crearUsuario(@Body() datos: CrearUsuarioDto) {
    return this.usuariosService.crearUsuario(datos);
  }

  @Put('/actualizar-usuario/:id')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  actualizarUsuario(@Param('id') id: number, @Body() datos: ActualizarUsuarioDto) {
    return this.usuariosService.actualizarUsuario(Number(id), datos);
  }

  @Delete('/eliminar-usuario/:id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  eliminarUsuario(@Param('id') id: number) {
    return this.usuariosService.eliminarUsuario(Number(id));
  }


}
