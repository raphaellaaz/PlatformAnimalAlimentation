import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class GlobalAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      
      if (!authHeader) {
        throw new UnauthorizedException('No se proporcionó token de autorización');
      }

      if (!authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Formato de token inválido');
      }

      return super.canActivate(context);
    } catch (error) {
      console.error('Error en GlobalAuthGuard:', error);
      throw error;
    }
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      console.error('Error en handleRequest:', err, info);
      throw new UnauthorizedException('Token inválido o expirado');
    }
    return user;
  }
} 