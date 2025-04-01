"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsuarioService = class UsuarioService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        const userExists = await this.prisma.usuario.findUnique({
            where: { correo: createUserDto.correo },
        });
        if (userExists) {
            throw new common_1.ConflictException('El correo ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.contrasena_hash, 10);
        const user = await this.prisma.usuario.create({
            data: {
                ...createUserDto,
                contrasena_hash: hashedPassword,
            },
        });
        const token = this.jwtService.sign({
            sub: user.id,
            correo: user.correo
        });
        const { contrasena_hash, ...result } = user;
        return {
            ...result,
            token,
        };
    }
    async login(loginUserDto) {
        const user = await this.prisma.usuario.findUnique({
            where: { correo: loginUserDto.correo },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.contrasena_hash, user.contrasena_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const token = this.jwtService.sign({
            sub: user.id,
            correo: user.correo
        });
        const { contrasena_hash, ...result } = user;
        return {
            ...result,
            token,
        };
    }
    async findOrCreateOAuthUser(userInfo) {
        let user = await this.prisma.usuario.findUnique({
            where: { correo: userInfo.email },
        });
        if (!user) {
            user = await this.prisma.usuario.create({
                data: {
                    nombre: userInfo.name || userInfo.email.split('@')[0],
                    apellido: userInfo.family_name || '',
                    correo: userInfo.email,
                    telefono: userInfo.phone_number || '',
                    contrasena_hash: await bcrypt.hash(Math.random().toString(36), 10),
                    id_tipo_usuario: 2,
                },
            });
        }
        const token = this.jwtService.sign({
            sub: user.id,
            correo: user.correo
        });
        const { contrasena_hash, ...result } = user;
        return {
            ...result,
            token,
        };
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map