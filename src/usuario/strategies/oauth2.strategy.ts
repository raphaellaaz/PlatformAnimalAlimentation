import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { UsuarioService } from '../usuario.service';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor(private readonly usuarioService: UsuarioService) {
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
  }

  async validate(accessToken: string): Promise<any> {
    try {
      // Obtener información del usuario desde el proveedor OAuth
      const userInfo = await this.getUserInfo(accessToken);
      
      // Buscar o crear usuario en nuestra base de datos
      const user = await this.usuarioService.findOrCreateOAuthUser(userInfo);
      
      return user;
    } catch (error) {
      throw new Error('Error al validar usuario OAuth');
    }
  }

  private async getUserInfo(accessToken: string): Promise<any> {
    if (!process.env.OAUTH_USERINFO_URL) {
      throw new Error('Falta la URL de información del usuario');
    }

    const response = await fetch(process.env.OAUTH_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.json();
  }
} 