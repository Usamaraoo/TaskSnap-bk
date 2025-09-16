// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy';  // Import the strategy
import { JwtAuthGuard } from './jwt-auth.guard';  // Import the JWT Auth Guard
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',  // Use your secret key
            signOptions: {
                expiresIn: '1h',  // Token expires in 1 hour
            },
        })],
    providers: [JwtStrategy, JwtAuthGuard, UserService],  // Add the strategy to providers
    exports: [JwtAuthGuard, JwtStrategy],  // Export the guard and strategy if needed in other modules
})
export class AuthModule { }
