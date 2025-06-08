import { PrismaService } from 'src/prisma/prisma.service';
export declare class DietaController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        id_dieta: number;
        id_etapa: number;
        porcentaje_proteina?: number;
        porcentaje_energia?: number;
        porcentaje_fibra?: number;
        suplementos?: string;
    }): Promise<{
        id_etapa: number;
        id_dieta: number;
        porcentaje_proteina: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_energia: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_fibra: import("@prisma/client/runtime/library").Decimal | null;
        suplementos: string | null;
    }>;
    findAll(): Promise<({
        etapas_desarrollo: {
            id_etapa: number;
            id_especie: number;
            nombre_etapa: string;
            edad_inicio: number;
            edad_fin: number;
            descripcion: string | null;
        };
    } & {
        id_etapa: number;
        id_dieta: number;
        porcentaje_proteina: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_energia: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_fibra: import("@prisma/client/runtime/library").Decimal | null;
        suplementos: string | null;
    })[]>;
    findOne(id: string): Promise<({
        etapas_desarrollo: {
            id_etapa: number;
            id_especie: number;
            nombre_etapa: string;
            edad_inicio: number;
            edad_fin: number;
            descripcion: string | null;
        };
    } & {
        id_etapa: number;
        id_dieta: number;
        porcentaje_proteina: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_energia: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_fibra: import("@prisma/client/runtime/library").Decimal | null;
        suplementos: string | null;
    }) | null>;
    update(id: string, data: {
        id_etapa?: number;
        porcentaje_proteina?: number;
        porcentaje_energia?: number;
        porcentaje_fibra?: number;
        suplementos?: string;
    }): Promise<{
        id_etapa: number;
        id_dieta: number;
        porcentaje_proteina: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_energia: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_fibra: import("@prisma/client/runtime/library").Decimal | null;
        suplementos: string | null;
    }>;
    delete(id: string): Promise<{
        id_etapa: number;
        id_dieta: number;
        porcentaje_proteina: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_energia: import("@prisma/client/runtime/library").Decimal | null;
        porcentaje_fibra: import("@prisma/client/runtime/library").Decimal | null;
        suplementos: string | null;
    }>;
}
