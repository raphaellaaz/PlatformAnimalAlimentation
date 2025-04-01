import { PrismaService } from 'src/prisma/prisma.service';
export declare class EtapasDesarrolloController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        id_etapa: number;
        nombre_etapa: string;
        id_especie: number;
        edad_inicio: number;
        edad_fin: number;
        descripcion?: string;
    }): Promise<{
        id_etapa: number;
        id_especie: number;
        nombre_etapa: string;
        edad_inicio: number;
        edad_fin: number;
        descripcion: string | null;
    }>;
    findAll(): Promise<{
        id_etapa: number;
        id_especie: number;
        nombre_etapa: string;
        edad_inicio: number;
        edad_fin: number;
        descripcion: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id_etapa: number;
        id_especie: number;
        nombre_etapa: string;
        edad_inicio: number;
        edad_fin: number;
        descripcion: string | null;
    } | null>;
    update(id: string, data: {
        nombre_etapa?: string;
    }): Promise<{
        id_etapa: number;
        id_especie: number;
        nombre_etapa: string;
        edad_inicio: number;
        edad_fin: number;
        descripcion: string | null;
    }>;
    delete(id: string): Promise<{
        id_etapa: number;
        id_especie: number;
        nombre_etapa: string;
        edad_inicio: number;
        edad_fin: number;
        descripcion: string | null;
    }>;
}
