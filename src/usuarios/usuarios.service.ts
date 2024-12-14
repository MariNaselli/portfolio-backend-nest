import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  private usuarios = [
    { id: 1, nombre: 'Juan Pérez', edad: 25, email: 'juan.perez@example.com' },
    { id: 2, nombre: 'Ana Gómez', edad: 30, email: 'ana.gomez@example.com' },
  ];

  listarUsuarios() {
    return this.usuarios;
  }

  obtenerUsuarioPorId(id: number) {
    return this.usuarios.find((usuario) => usuario.id === id);
  }

  crearUsuario(usuario: any) {
    const nuevoUsuario = { id: Date.now(), ...usuario };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  actualizarUsuario(id: number, datos: any) {
    const usuario = this.obtenerUsuarioPorId(id);
    if (usuario) {
      Object.assign(usuario, datos);
      return usuario;
    }
    return null;
  }

  eliminarUsuario(id: number) {
    const index = this.usuarios.findIndex((usuario) => usuario.id === id);
    if (index !== -1) {
      return this.usuarios.splice(index, 1);
    }
    return null;
  }
}

