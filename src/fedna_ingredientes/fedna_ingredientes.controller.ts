import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Controller('ingredientes')
export class FednaIngredientesController {

    constructor(private readonly prisma: PrismaService) {}

    // Insertar (Crear)
    @Post()
    async create(@Body() data: { name: string }) {
      return this.prisma.fedna.create({ data });
    }
  
    // Leer (Obtener todos)
    @Get()
    async findAll() {
      return this.prisma.especies.findMany();
    }
  
    // Leer (Obtener uno por ID)
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.prisma.especies.findUnique({ where: { id_especie: Number(id) } });
    }
  
    //// Actualizar (Modificar)
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: { name?: string }) {
      return this.prisma.fedna.update({ where: { id: Number(id) }, data });
    }
  
    // Eliminar
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.prisma.fedna.delete({ where: { id: Number(id) } });
    }


    
}
