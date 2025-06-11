import { Controller, Post, Body, UseGuards, Request, Get, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(req.body.username, req.body.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    try {
      const result = await this.authService.register(body.username, body.password);
      return { 
        message: 'Usuario registrado exitosamente', 
        access_token: result.access_token,
        userId: result.userId,
        username: result.username,
        role: result.role
      };
    } catch (error) {
      if (error.code === 11000) { // Código de error de MongoDB para duplicados
        throw new ConflictException('El nombre de usuario ya está en uso');
      }
      throw error;
    }
  }
}
