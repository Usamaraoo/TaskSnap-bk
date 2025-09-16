// src/user/user.controller.ts
import { Controller, Post, Body, Res, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('signup')
    async signup(@Body() body: { email: string; password: string }) {
        const { email, password } = body;
        return this.userService.signup(email, password);
    }
    @Post('signin')
    async signin(@Body() body: { email: string; password: string }, @Res() res: Response) {
        const { email, password } = body;
        try {
            const result = await this.userService.signin(email, password);

            // Set the JWT token to the cookie
            res.cookie('token', result.token, {
                httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // Only set cookies over HTTPS in production
                maxAge: 60 * 60 * 1000, // 1 hour expiration time
            });

            // Send response with a message
            return res.json({ message: 'Signin successful' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
