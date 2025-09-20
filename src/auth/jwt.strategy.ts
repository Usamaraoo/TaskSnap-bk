// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.token,  // Assuming you're sending token as a cookie
                // Or if you're using Authorization header:
                // (req) => req?.headers?.authorization?.split(' ')[1], // Bearer token
            ]),
            ignoreExpiration: false,  // Check if token has expired
            secretOrKey: process.env.JWT_SECRET || 'secretKey',  // Your JWT secret
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findById(payload.id);
        if (!user) {
            throw new Error('User not found');
        }
        return { id: user.id, email: user.email };  // Return data to be added to `req.user`
    }
}
