import { Controller, Post, Body, Get, UseGuards, Req, HttpStatus, HttpCode, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './auth.types';
import { CreateUserDto } from '../usuario/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.correo, loginDto.contrasena);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Public()
  @Get('oauth/google')
  @UseGuards(AuthGuard('oauth2'))
  async googleAuth() {
    // Este endpoint inicia el flujo de autenticación de Google
    this.logger.log('Iniciando autenticación con Google');
    // La redirección ocurre automáticamente
  }

  @Public()
  @Get('oauth/google/callback')
  @UseGuards(AuthGuard('oauth2'))
  async googleAuthCallback(@Req() req) {
    this.logger.log('Callback de Google OAuth recibido');
    
    // El usuario ya estará disponible gracias a la estrategia OAuth2
    // req.user contiene los datos procesados por la estrategia
    if (!req.user) {
      this.logger.error('No se recibió información de usuario en el callback de OAuth');
      throw new UnauthorizedException('Error en la autenticación con Google');
    }
    
    return req.user;
  }
}