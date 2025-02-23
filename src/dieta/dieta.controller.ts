import { Controller, Get, Post, Delete,  Put , Param, Body} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('dieta')
export class DietaController {

     constructor(private readonly prisma: PrismaService) {}
       // Insertar (Crear)
            @Post()
            async create(@Body() data: {id_dieta: number; id_etapa: number, porcentaje_proteina?: number; porcentaje_energia?: number; porcentaje_fibra?: number; suplementos?: string}) {
              return this.prisma.dietas.create({ data });
            }
          
            // Leer (Obtener todos)
            @Get()
            async findAll() {
              return this.prisma.dietas.findMany();
            }
          
            // Leer (Obtener uno por ID)
            @Get(':id')
            async findOne(@Param('id') id: string) {
              return this.prisma.dietas.findUnique({ where: { id_dieta: Number(id) } });
            }
          
            //// Actualizar (Modificar)
            @Put(':id')
            async update(@Param('id') id: string, @Body() data: { id_etapa: number, porcentaje_proteina?: number; porcentaje_energia?: number; porcentaje_fibra?: number; suplementos?: string }) {
              return this.prisma.dietas.update({ where: { id_dieta: Number(id) }, data });
            }
          
            // Eliminar
            @Delete(':id')
            async delete(@Param('id') id: string) {
              return this.prisma.dietas.delete({ where: { id_dieta: Number(id) } });
            }
        
}
