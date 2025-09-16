// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // src/user/user.service.ts
    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });  // This will return either a User or null
    }


    async signup(email: string, password: string): Promise<any> {
        // Check if the user already exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        await this.userRepository.save(user);

        return { message: 'User created successfully' };
    }

    async signin(email: string, password: string): Promise<any> {
        // Find the user by email
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare the given password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'secretKey', // Use a more secure key in a real-world application
            { expiresIn: '1h' },
        );

        return { message: 'Signin successful', token };
    }
}
