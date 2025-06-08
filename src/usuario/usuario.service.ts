import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.usuario.findMany({
      include: { tipo_usuarios: true },
    });
    
    return users.map(user => {
      const { contrasena_hash, ...result } = user;
      return result;
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: { tipo_usuarios: true },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const { contrasena_hash, ...result } = user;
    return result;
  }

  async update(id: number, updateData: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    correo?: string;
    id_tipo_usuario?: number;
  }) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const updatedUser = await this.prisma.usuario.update({
      where: { id },
      data: updateData,
    });

    const { contrasena_hash, ...result } = updatedUser;
    return result;
  }

  async remove(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const deletedUser = await this.prisma.usuario.delete({
      where: { id },
    });

    const { contrasena_hash, ...result } = deletedUser;
    return result;
  }
}