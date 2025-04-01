import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsuarioController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        contrasena_hash: string;
        id_tipo_usuario: number;
    }): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        contrasena_hash: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    }>;
    findAll(): Promise<({
        tipo_usuarios: {
            id: number;
            fecha_registro: Date | null;
            tipo_usuario: string;
        };
    } & {
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        contrasena_hash: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    })[]>;
    findOne(id: string): Promise<({
        tipo_usuarios: {
            id: number;
            fecha_registro: Date | null;
            tipo_usuario: string;
        };
    } & {
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        contrasena_hash: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    }) | null>;
    update(id: string, data: {
        nombre?: string;
        apellido?: string;
        telefono?: string;
        correo?: string;
        contrasena_hash?: string;
        id_tipo_usuario?: number;
    }): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        contrasena_hash: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    }>;
    delete(id: string): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        contrasena_hash: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    }>;
}
