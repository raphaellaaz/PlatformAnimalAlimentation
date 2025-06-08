import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EtapasDesarrolloController } from './etapas_desarrollo/etapas_desarrollo.controller';
import { DietaController } from './dieta/dieta.controller';
import { EspeciesController } from './especies/especies.controller';
import { FednaIngredientesController } from './fedna_ingredientes/fedna_ingredientes.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { TipoUsuarioController } from './tipo_usuario/tipo_usuario.controller';
import { GlobalAuthGuard } from './auth/guards/global-auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [
    AppController, 
    FednaIngredientesController, 
    EspeciesController, 
    DietaController, 
    EtapasDesarrolloController, 
    TipoUsuarioController
  ],
  providers: [
    AppService,
    PrismaService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
  ],
})
export class AppModule {}