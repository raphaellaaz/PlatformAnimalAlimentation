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
let UsuarioService = class UsuarioService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const users = await this.prisma.usuario.findMany({
            include: { tipo_usuarios: true },
        });
        return users.map(user => {
            const { contrasena_hash, ...result } = user;
            return result;
        });
    }
    async findOne(id) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
            include: { tipo_usuarios: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        const { contrasena_hash, ...result } = user;
        return result;
    }
    async update(id, updateData) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        const updatedUser = await this.prisma.usuario.update({
            where: { id },
            data: updateData,
        });
        const { contrasena_hash, ...result } = updatedUser;
        return result;
    }
    async remove(id) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        const deletedUser = await this.prisma.usuario.delete({
            where: { id },
        });
        const { contrasena_hash, ...result } = deletedUser;
        return result;
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map