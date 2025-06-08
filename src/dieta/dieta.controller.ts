import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dieta')
@UseGuards(JwtAuthGuard)
export class DietaController {
  constructor(private readonly prisma: PrismaService) {}

  // Insertar (Crear especie)
  @Post()
  async create(@Body() data: { id_dieta: number; id_etapa: number, porcentaje_proteina?: number, porcentaje_energia?: number, porcentaje_fibra?: number, suplementos?: string }) {
    return this.prisma.dietas.create({ data });
  }

  // Leer (Obtener todas las especies)
  @Get()
  async findAll() {
    return this.prisma.dietas.findMany({
      include: { etapas_desarrollo: true },
    });
  }

  // Leer (Obtener una especies por ID)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.dietas.findUnique({ 
      where: { id_dieta: Number(id) },
      include: { etapas_desarrollo: true },
    });
  }

  // Actualizar (Modificar especies)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: { id_etapa?: number, porcentaje_proteina?: number, porcentaje_energia?: number, porcentaje_fibra?: number, suplementos?: string }) {
    return this.prisma.dietas.update({ 
      where: { id_dieta: Number(id) }, 
      data 
    });
  }

  // Eliminar especie
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.prisma.dietas.delete({ where: { id_dieta: Number(id) } });
  }
}
