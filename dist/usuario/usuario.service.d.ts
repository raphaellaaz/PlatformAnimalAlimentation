import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsuarioService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        token: string;
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    }>;
    findOrCreateOAuthUser(userInfo: any): Promise<{
        token: string;
        id: number;
        nombre: string;
        apellido: string;
        telefono: string;
        correo: string;
        fecha_registro: Date | null;
        id_tipo_usuario: number;
    }>;
}
