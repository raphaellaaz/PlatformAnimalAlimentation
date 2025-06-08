import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  private readonly logger = new Logger(OAuth2Strategy.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    // Utilizar valores por defecto para Google OAuth2
    const authURL = configService.get('OAUTH_AUTH_URL', 'https://accounts.google.com/o/oauth2/v2/auth');
    const tokenURL = configService.get('OAUTH_TOKEN_URL', 'https://oauth2.googleapis.com/token');
    const clientID = configService.get('OAUTH_CLIENT_ID');
    const clientSecret = configService.get('OAUTH_CLIENT_SECRET');
    const callbackURL = configService.get('OAUTH_CALLBACK_URL', 'http://localhost:3000/auth/oauth/google/callback');
    
    // Registrar información de depuración
    if (!clientID || !clientSecret) {
      Logger.warn('Credenciales OAuth2 no configuradas. La autenticación OAuth2 no funcionará correctamente.', 'OAuth2Strategy');
    }

    super({
      authorizationURL: authURL,
      tokenURL: tokenURL,
      clientID: clientID || 'dummy-client-id', // Evitar que falle la inicialización
      clientSecret: clientSecret || 'dummy-client-secret', // Evitar que falle la inicialización
      callbackURL: callbackURL,
      scope: ['profile', 'email'],
      state: false, // Deshabilitar state para evitar problema de sesión
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    try {
      // Verificar que tenemos token
      if (!accessToken) {
        this.logger.error('No se proporcionó access token');
        return done(new Error('No se proporcionó access token'), null);
      }
      
      // Obtener información del usuario desde el proveedor OAuth
      let userInfo;
      try {
        userInfo = await this.getUserInfo(accessToken);
      } catch (error) {
        this.logger.error(`Error al obtener información del usuario: ${error.message}`);
        return done(error, null);
      }

      // Si tenemos información del usuario, intentar crear/encontrar en nuestra base
      if (userInfo && userInfo.email) {
        const user = await this.authService.findOrCreateOAuthUser(userInfo);
        return done(null, user);
      } else {
        this.logger.error('Información de usuario incompleta', userInfo);
        return done(new Error('Información de usuario incompleta desde proveedor OAuth'), null);
      }
    } catch (error) {
      this.logger.error(`Error en validación OAuth: ${error.message}`);
      return done(error, null);
    }
  }

  private async getUserInfo(accessToken: string): Promise<any> {
    const userInfoURL = this.configService.get('OAUTH_USERINFO_URL', 'https://www.googleapis.com/oauth2/v3/userinfo');
    
    this.logger.debug(`Obteniendo información del usuario desde: ${userInfoURL}`);
    
    const response = await fetch(userInfoURL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    
    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`Error al obtener información del usuario: ${error}`);
      throw new Error(`Error al obtener información del usuario: ${response.statusText}`);
    }
    
    return response.json();
  }
}