import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Verificar si el usuario ya existe
    const userExists = await this.prisma.usuario.findUnique({
      where: { correo: createUserDto.correo },
    });

    if (userExists) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.contrasena_hash, 10);

    // Crear el usuario
    const user = await this.prisma.usuario.create({
      data: {
        ...createUserDto,
        contrasena_hash: hashedPassword,
      },
    });

    // Generar token JWT
    const token = this.jwtService.sign({ 
      sub: user.id,
      correo: user.correo 
    });

    // Retornar usuario sin la contraseña y con el token
    const { contrasena_hash, ...result } = user;
    return {
      ...result,
      token,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    // Buscar usuario
    const user = await this.prisma.usuario.findUnique({
      where: { correo: loginUserDto.correo },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.contrasena_hash,
      user.contrasena_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar token JWT
    const token = this.jwtService.sign({ 
      sub: user.id,
      correo: user.correo 
    });

    // Retornar usuario sin la contraseña y con el token
    const { contrasena_hash, ...result } = user;
    return {
      ...result,
      token,
    };
  }

  async findOrCreateOAuthUser(userInfo: any) {
    // Buscar usuario por correo
    let user = await this.prisma.usuario.findUnique({
      where: { correo: userInfo.email },
    });

    if (!user) {
      // Crear nuevo usuario si no existe
      user = await this.prisma.usuario.create({
        data: {
          nombre: userInfo.name || userInfo.email.split('@')[0],
          apellido: userInfo.family_name || '',
          correo: userInfo.email,
          telefono: userInfo.phone_number || '',
          contrasena_hash: await bcrypt.hash(Math.random().toString(36), 10),
          id_tipo_usuario: 2, // Asignar tipo de usuario por defecto
        },
      });
    }

    // Generar token JWT
    const token = this.jwtService.sign({ 
      sub: user.id,
      correo: user.correo 
    });

    // Retornar usuario sin la contraseña y con el token
    const { contrasena_hash, ...result } = user;
    return {
      ...result,
      token,
    };
  }
} 