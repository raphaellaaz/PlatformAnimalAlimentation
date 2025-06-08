import { Controller, Get, Param, Put, Delete, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuario')
@UseGuards(AuthGuard('jwt'))
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Leer (Obtener todos los usuarios)
  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  // Leer (Obtener un usuario por ID)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findOne(id);
  }

  // Actualizar (Modificar usuario)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateData: { 
      nombre?: string; 
      apellido?: string; 
      telefono?: string; 
      correo?: string; 
      id_tipo_usuario?: number; 
    }
  ) {
    return this.usuarioService.update(id, updateData);
  }

  // Eliminar usuario
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(id);
  }
}