import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Configurar sesiones para OAuth
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'mi_secreto_de_sesion',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60, // 1 hora
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }
    }),
  );

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Importante para que las cookies de sesión funcionen con CORS
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicación corriendo en: http://localhost:${port}`);
}
bootstrap();