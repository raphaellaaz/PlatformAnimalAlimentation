import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('especies')
export class EspeciesController {

 constructor(private readonly prisma: PrismaService) {}
    
    //// Insertar (Crear)
    //@Post()
    //async create(@Body() data: {nombre: string; tipo?: String;}) {
    //  return this.prisma.especies.create({ data });
    //}
  
    // Leer (Obtener todos)
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
      return this.prisma.especies.findMany();
    }
  
    // Leer (Obtener uno por ID)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.prisma.especies.findUnique({ where: { id_especie: Number(id) } });
    }
  
    //// Actualizar (Modificar)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: { nombre: string, tipo?: string }) {
      return this.prisma.especies.update({ where: { id_especie: Number(id) }, data });
    }
  
    // Eliminar
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
      return this.prisma.especies.delete({ where: { id_especie: Number(id) } });
    }

}
