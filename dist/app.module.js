"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_module_1 = require("./prisma/prisma.module");
const etapas_desarrollo_controller_1 = require("./etapas_desarrollo/etapas_desarrollo.controller");
const dieta_controller_1 = require("./dieta/dieta.controller");
const especies_controller_1 = require("./especies/especies.controller");
const fedna_ingredientes_controller_1 = require("./fedna_ingredientes/fedna_ingredientes.controller");
const usuario_module_1 = require("./usuario/usuario.module");
const tipo_usuario_controller_1 = require("./tipo_usuario/tipo_usuario.controller");
const global_auth_guard_1 = require("./auth/guards/global-auth.guard");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            usuario_module_1.UsuarioModule,
        ],
        controllers: [
            app_controller_1.AppController,
            fedna_ingredientes_controller_1.FednaIngredientesController,
            especies_controller_1.EspeciesController,
            dieta_controller_1.DietaController,
            etapas_desarrollo_controller_1.EtapasDesarrolloController,
            tipo_usuario_controller_1.TipoUsuarioController
        ],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            core_1.Reflector,
            {
                provide: core_1.APP_GUARD,
                useClass: global_auth_guard_1.GlobalAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map