import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

/**
 * Refresh token strategy
 */
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rt-secret',
            passReqToCallback: true,
        });
    }

    validate(request: Request, payload: any) {
        const refreshToken = request.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken,
        };
    }
}
