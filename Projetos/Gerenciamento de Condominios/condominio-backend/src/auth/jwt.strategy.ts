import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MINHA_CHAVE_SECRETA_MUITO_SEGURA', 
    });
  }

  async validate(payload: any) {
    return { ID_USUARIO: payload.sub, NOME: payload.nome };
  }
}