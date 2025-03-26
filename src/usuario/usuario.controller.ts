import { Controller, Get, Post, Delete,  Put , Param, Body} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly prisma: PrismaService) {}

  // Insertar (Crear usuario)
  @Post()
  async create(@Body() data: { 
    nombre: string; 
    apellido: string; 
    telefono: string; 
    correo: string; 
    contrasena_hash: string; 
    id_tipo_usuario: number; 
  }) {
    return this.prisma.usuario.create({ data });
  }

  // Leer (Obtener todos los usuarios)
  @Get()
  async findAll() {
    return this.prisma.usuario.findMany({
      include: { tipo_usuarios: true }, // Incluye la relación con `tipo_usuarios`
    });
  }

  // Leer (Obtener un usuario por ID)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.usuario.findUnique({ 
      where: { id: Number(id) },
      include: { tipo_usuarios: true }, // Incluye la relación
    });
  }

  // Actualizar (Modificar usuario)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: { 
    nombre?: string; 
    apellido?: string; 
    telefono?: string; 
    correo?: string; 
    contrasena_hash?: string; 
    id_tipo_usuario?: number; 
  }) {
    return this.prisma.usuario.update({ 
      where: { id: Number(id) }, 
      data 
    });
  }

  // Eliminar usuario
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.prisma.usuario.delete({ where: { id: Number(id) } });
  }
}