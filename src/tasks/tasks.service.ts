import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createBoard(board: CreateBoardDto, userId: number): Promise<Board | null> {
        const user = await this.userRepository.findOneBy({ id: userId })
        console.log('user', user)
        if (!user) {
            throw new Error('User not found')
        }
        // const borad = 
        return null
    }

}
