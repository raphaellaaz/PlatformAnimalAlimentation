import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('etapas-desarrollo')
export class EtapasDesarrolloController {

        constructor(private readonly prisma: PrismaService) {}
    
        // Insertar (Crear)
        @Post()
        async create(@Body() data: { id_etapa: number ;nombre_etapa: string; id_especie: number; edad_inicio: number; edad_fin: number; descripcion?: string }) {
          return this.prisma.etapas_desarrollo.create({ data });
        }
      
        // Leer (Obtener todos)
        @Get()
        async findAll() {
          return this.prisma.etapas_desarrollo.findMany();
        }
      
        // Leer (Obtener uno por ID)
        @Get(':id')
        async findOne(@Param('id') id: string) {
          return this.prisma.etapas_desarrollo.findUnique({ where: { id_etapa: Number(id) } });
        }
      
        //// Actualizar (Modificar)
        @Put(':id')
        async update(@Param('id') id: string, @Body() data: { nombre_etapa?: string }) {
          return this.prisma.etapas_desarrollo.update({ where: { id_etapa: Number(id) }, data });
        }
      
        // Eliminar
        @Delete(':id')
        async delete(@Param('id') id: string) {
          return this.prisma.etapas_desarrollo.delete({ where: { id_etapa: Number(id) } });
        }
    
}
