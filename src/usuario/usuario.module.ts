import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioController } from './usuario.controller';
import { AuthController } from './auth.controller';
import { UsuarioService } from './usuario.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OAuth2Strategy } from './strategies/oauth2.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tu_secreto_super_secreto', 
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsuarioController, AuthController],
  providers: [UsuarioService, OAuth2Strategy],
  exports: [UsuarioService],
})
export class UsuarioModule {} 