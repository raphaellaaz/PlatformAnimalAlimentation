export interface LoginDto {
  correo: string;
  contrasena: string;
}

export interface LogoutDto {
  userId: number;
}

export interface AuthResponse {
  access_token: string;
  user?: any;
}

export interface JwtPayload {
  sub: number;
  correo: string;
  tipo_usuario: number;
}

export interface AuthUser {
  id: number;
  correo: string;
  tipo_usuario: number;
}