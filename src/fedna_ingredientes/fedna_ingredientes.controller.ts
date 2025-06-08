import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ingredientes')
export class FednaIngredientesController {

    constructor(private readonly prisma: PrismaService) {}

    // Insertar (Crear)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: { name: string }) {
      return this.prisma.fedna.create({ data });
    }
  
    // Leer (Obtener todos)
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
      return this.prisma.fedna.findMany();
    }
  
    // Leer (Obtener uno por ID)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.prisma.fedna.findUnique({ where: { id: Number(id) } });
    }
  
    //// Actualizar (Modificar)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: { name?: string }) {
      return this.prisma.fedna.update({ where: { id: Number(id) }, data });
    }
  
    // Eliminar
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.prisma.fedna.delete({ where: { id: Number(id) } });
    }

}