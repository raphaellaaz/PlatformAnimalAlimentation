import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy, OAuth2Strategy } from './strategies';
import { GlobalAuthGuard } from './guards/global-auth.guard';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'tu_secreto_super_secreto'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '24h') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    OAuth2Strategy,
    GlobalAuthGuard,
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}