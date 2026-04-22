import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { LoginDto } from './dtos/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException("Erro ao criar usuário.");
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException("Erro ao tentar fazer login.");
    }
  }
}