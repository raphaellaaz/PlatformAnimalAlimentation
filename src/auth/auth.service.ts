import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload, AuthResponse } from './auth.types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(correo: string, contrasena: string): Promise<any> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena_hash);
    if (!isPasswordValid) {
      return null;
    }

    const { contrasena_hash, ...result } = usuario;
    return result;
  }

  async login(usuario: any): Promise<AuthResponse> {
    const payload: JwtPayload = { 
      sub: usuario.id,
      correo: usuario.correo,
      tipo_usuario: usuario.id_tipo_usuario 
    };
    
    return {
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        tipo_usuario: usuario.id_tipo_usuario
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserData: {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
    contrasena_hash: string;
    id_tipo_usuario: number;
  }): Promise<AuthResponse> {
    try {
      // Verificar si el usuario ya existe
      const userExists = await this.prisma.usuario.findUnique({
        where: { correo: createUserData.correo },
      });

      if (userExists) {
        throw new ConflictException('El correo ya está registrado');
      }

      // Verificar si existe al menos un tipo de usuario
      const tipoUsuarioCount = await this.prisma.tipo_usuarios.count();
      
      // Si no hay tipos de usuario, crear uno por defecto
      if (tipoUsuarioCount === 0) {
        this.logger.log('Creando tipo de usuario por defecto');
        
        await this.prisma.tipo_usuarios.create({
          data: {
            id: 1,
            tipo_usuario: 'Administrador',
          },
        });
        
        await this.prisma.tipo_usuarios.create({
          data: {
            id: 2,
            tipo_usuario: 'Usuario',
          },
        });
      }

      // Verificar que el tipo de usuario existe
      const tipoUsuario = await this.prisma.tipo_usuarios.findUnique({
        where: { id: createUserData.id_tipo_usuario },
      });

      if (!tipoUsuario) {
        // Usar tipo usuario = 2 (Usuario normal) como fallback
        createUserData.id_tipo_usuario = 2;
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(createUserData.contrasena_hash, 10);

      // Crear el usuario
      const user = await this.prisma.usuario.create({
        data: {
          ...createUserData,
          contrasena_hash: hashedPassword,
        },
      });

      // Generar token JWT
      const payload: JwtPayload = { 
        sub: user.id,
        correo: user.correo,
        tipo_usuario: user.id_tipo_usuario 
      };

      // Retornar usuario sin la contraseña y con el token
      const { contrasena_hash, ...result } = user;
      return {
        user: result,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Error en registro: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOrCreateOAuthUser(userInfo: any): Promise<AuthResponse> {
    try {
      this.logger.debug(`Procesando información OAuth para: ${userInfo.email}`);
      
      // Verificar si existe al menos un tipo de usuario
      const tipoUsuarioCount = await this.prisma.tipo_usuarios.count();
      
      // Si no hay tipos de usuario, crear tipos por defecto
      if (tipoUsuarioCount === 0) {
        this.logger.log('Creando tipos de usuario por defecto');
        
        await this.prisma.tipo_usuarios.create({
          data: {
            id: 1,
            tipo_usuario: 'Administrador',
          },
        });
        
        await this.prisma.tipo_usuarios.create({
          data: {
            id: 2,
            tipo_usuario: 'Usuario',
          },
        });
      }

      // Buscar usuario por correo
      let user = await this.prisma.usuario.findUnique({
        where: { correo: userInfo.email },
      });

      if (!user) {
        // Crear nuevo usuario si no existe
        this.logger.log(`Creando nuevo usuario OAuth para: ${userInfo.email}`);
        
        // Generar una contraseña aleatoria segura
        const randomPassword = Math.random().toString(36).slice(-10) + 
                              Math.random().toString(36).slice(-10);
        
        try {
          user = await this.prisma.usuario.create({
            data: {
              nombre: userInfo.name || userInfo.given_name || userInfo.email.split('@')[0],
              apellido: userInfo.family_name || '',
              correo: userInfo.email,
              telefono: userInfo.phone_number || 'No disponible',
              contrasena_hash: await bcrypt.hash(randomPassword, 10),
              id_tipo_usuario: 2, // Usuario normal
            },
          });
        } catch (error) {
          this.logger.error(`Error al crear usuario OAuth: ${error.message}`, error.stack);
          throw new Error(`No se pudo crear la cuenta: ${error.message}`);
        }
      } else {
        this.logger.debug(`Usuario OAuth encontrado: ${user.id}`);
      }

      // Generar token JWT
      const payload: JwtPayload = { 
        sub: user.id,
        correo: user.correo,
        tipo_usuario: user.id_tipo_usuario 
      };

      // Retornar usuario sin la contraseña y con el token
      const { contrasena_hash, ...result } = user;
      return {
        user: result,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Error en findOrCreateOAuthUser: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getUserById(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: { tipo_usuarios: true },
    });
    
    if (!user) {
      return null;
    }
    
    const { contrasena_hash, ...result } = user;
    return result;
  }

  async findByEmail(correo: string) {
    return this.prisma.usuario.findUnique({
      where: { correo },
    });
  }
}