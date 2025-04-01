import { IsEmail, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  telefono: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contrasena_hash: string;

  @IsNumber()
  id_tipo_usuario: number;
} 