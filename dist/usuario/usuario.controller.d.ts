import { UsuarioService } from './usuario.service';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
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
    delete(id: number): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        id_tipo_usuario: number;
        fecha_registro: Date;
    }>;
}
