import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'tu_secreto_super_secreto'),
    });
  }

  async validate(payload: JwtPayload) {
    try {
      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Token inválido');
      }

      // Verificar que el usuario existe en la base de datos
      const user = await this.prisma.usuario.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      return { 
        id: payload.sub, 
        correo: payload.correo, 
        tipo_usuario: payload.tipo_usuario 
      };
    } catch (error) {
      throw new UnauthorizedException('Error en autenticación');
    }
  }
}