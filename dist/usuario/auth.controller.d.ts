import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
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
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any): Promise<any>;
}
