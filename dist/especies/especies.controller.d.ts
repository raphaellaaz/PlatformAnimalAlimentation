import { PrismaService } from 'src/prisma/prisma.service';
export declare class EspeciesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id_especie: number;
        nombre: string;
        tipo: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id_especie: number;
        nombre: string;
        tipo: string | null;
    } | null>;
    update(id: string, data: {
        nombre: string;
        tipo?: string;
    }): Promise<{
        id_especie: number;
        nombre: string;
        tipo: string | null;
    }>;
    delete(id: string): Promise<{
        id_especie: number;
        nombre: string;
        tipo: string | null;
    }>;
}
