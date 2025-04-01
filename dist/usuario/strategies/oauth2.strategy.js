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
exports.OAuth2Strategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_oauth2_1 = require("passport-oauth2");
const usuario_service_1 = require("../usuario.service");
let OAuth2Strategy = class OAuth2Strategy extends (0, passport_1.PassportStrategy)(passport_oauth2_1.Strategy, 'oauth2') {
    constructor(usuarioService) {
        if (!process.env.OAUTH_AUTH_URL || !process.env.OAUTH_TOKEN_URL ||
            !process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET ||
            !process.env.OAUTH_CALLBACK_URL) {
            throw new Error('Faltan variables de entorno de OAuth');
        }
        super({
            authorizationURL: process.env.OAUTH_AUTH_URL,
            tokenURL: process.env.OAUTH_TOKEN_URL,
            clientID: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            callbackURL: process.env.OAUTH_CALLBACK_URL,
            scope: ['profile', 'email'],
        });
        this.usuarioService = usuarioService;
    }
    async validate(accessToken) {
        try {
            const userInfo = await this.getUserInfo(accessToken);
            const user = await this.usuarioService.findOrCreateOAuthUser(userInfo);
            return user;
        }
        catch (error) {
            throw new Error('Error al validar usuario OAuth');
        }
    }
    async getUserInfo(accessToken) {
        if (!process.env.OAUTH_USERINFO_URL) {
            throw new Error('Falta la URL de información del usuario');
        }
        const response = await fetch(process.env.OAUTH_USERINFO_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.json();
    }
};
exports.OAuth2Strategy = OAuth2Strategy;
exports.OAuth2Strategy = OAuth2Strategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], OAuth2Strategy);
//# sourceMappingURL=oauth2.strategy.js.map