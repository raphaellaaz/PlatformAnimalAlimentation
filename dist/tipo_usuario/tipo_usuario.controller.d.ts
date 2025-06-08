import { PrismaService } from 'src/prisma/prisma.service';
export declare class TipoUsuarioController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        tipo_usuario: string;
        fecha_registro: Date;
    }): Promise<{
        id: number;
        fecha_registro: Date;
        tipo_usuario: string;
    }>;
    findAll(): Promise<{
        id: number;
        fecha_registro: Date;
        tipo_usuario: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        fecha_registro: Date;
        tipo_usuario: string;
    } | null>;
    update(id: string, data: {
        tipo_usuario?: string;
        fecha_registro?: Date;
    }): Promise<{
        id: number;
        fecha_registro: Date;
        tipo_usuario: string;
    }>;
    delete(id: string): Promise<{
        id: number;
        fecha_registro: Date;
        tipo_usuario: string;
    }>;
}
