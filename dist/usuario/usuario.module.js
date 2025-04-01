"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const usuario_controller_1 = require("./usuario.controller");
const auth_controller_1 = require("./auth.controller");
const usuario_service_1 = require("./usuario.service");
const prisma_module_1 = require("../prisma/prisma.module");
const oauth2_strategy_1 = require("./strategies/oauth2.strategy");
let UsuarioModule = class UsuarioModule {
};
exports.UsuarioModule = UsuarioModule;
exports.UsuarioModule = UsuarioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'tu_secreto_super_secreto',
                signOptions: { expiresIn: '24h' },
            }),
        ],
        controllers: [usuario_controller_1.UsuarioController, auth_controller_1.AuthController],
        providers: [usuario_service_1.UsuarioService, oauth2_strategy_1.OAuth2Strategy],
        exports: [usuario_service_1.UsuarioService],
    })
], UsuarioModule);
//# sourceMappingURL=usuario.module.js.map