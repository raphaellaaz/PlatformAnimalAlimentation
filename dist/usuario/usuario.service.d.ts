import { PrismaService } from '../prisma/prisma.service';
export declare class UsuarioService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        tipo_usuarios: {
            id: number;
            fecha_registro: Date;
            tipo_usuario: string;
        };
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        id_tipo_usuario: number;
        fecha_registro: Date;
    }[]>;
    findOne(id: number): Promise<{
        tipo_usuarios: {
            id: number;
            fecha_registro: Date;
            tipo_usuario: string;
        };
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        id_tipo_usuario: number;
        fecha_registro: Date;
    }>;
    update(id: number, updateData: {
        nombre?: string;
        apellido?: string;
        telefono?: string;
        correo?: string;
        id_tipo_usuario?: number;
    }): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        id_tipo_usuario: number;
        fecha_registro: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        id_tipo_usuario: number;
        fecha_registro: Date;
    }>;
}
