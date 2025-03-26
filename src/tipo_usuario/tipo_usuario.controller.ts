import { Controller, Get, Post, Delete,  Put , Param, Body} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('tipo-usuario')
export class TipoUsuarioController {

  constructor(private readonly prisma: PrismaService) {}

  // Insertar (Crear tipo usuario)
  @Post()
  async create(@Body() data: { 
    tipo_usuario: string;
    fecha_registro: Date;
  }) {
    return this.prisma.tipo_usuarios.create({ data });
  }

  // Leer (Obtener todos los usuarios)
  @Get()
  async findAll() {
    return this.prisma.tipo_usuarios.findMany();
  }

  // Leer (Obtener un tipo usuario por ID)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.tipo_usuarios.findUnique({ 
      where: { id: Number(id) } // Incluye la relación
    });
  }

  // Actualizar (Modificar  tipo usuario)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: { 
    tipo_usuario?: string;
    fecha_registro?: Date;
  }) {
    return this.prisma.tipo_usuarios.update({ 
      where: { id: Number(id) }, 
      data 
    });
  }

  // Eliminar tipo usuario
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.prisma.tipo_usuarios.delete({ where: { id: Number(id) } });
  }
}