import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usuarioService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usuarioService.login(loginUserDto);
  }

  @Get('oauth/google')
  @UseGuards(AuthGuard('oauth2'))
  async googleAuth() {
    // Este endpoint iniciará el flujo de autenticación de Google
  }

  @Get('oauth/google/callback')
  @UseGuards(AuthGuard('oauth2'))
  async googleAuthCallback(@Req() req) {
    // Este endpoint manejará la respuesta de Google
    return req.user;
  }
} 