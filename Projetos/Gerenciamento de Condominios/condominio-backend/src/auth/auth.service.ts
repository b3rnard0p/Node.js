import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { Usuario } from '../usuarios/usuario.entity'; 
import { CreateUserDto } from './dtos/create-user-dto';
import { LoginDto } from './dtos/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private userRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    return this.userRepo.save(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOneBy({ CPF: dto.CPF });
    
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    
    const payload = { sub: user.ID_USUARIO, nome: user.NOME };
    
    return { access_token: this.jwtService.sign(payload) };
  }
}