import { User } from './../../core/user.core';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import config  from '../../../../../config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKeyProvider: passportJwtSecret({
              cache: true,
              rateLimit: true,
              jwksRequestsPerMinute: 5,
              jwksUri: `${config.STS_SETTINGS.issuer}/.well-known/jwks.json`,
            }),
        })
    }

    async validate(
      payload: any,
      done: (err: Error | null, result: User) => void,
    ) {      

      
      done(null, new User(payload.sub, payload.username));
    }
}
