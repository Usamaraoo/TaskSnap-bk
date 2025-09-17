import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    // create new board
    async createBoard(board: CreateBoardDto, userId: number): Promise<Board | string> {
        try {
            const user = await this.userRepository.findOneBy({ id: userId })
            console.log('user', user)
            if (!user) {
                throw new NotFoundException('User not found')
            }
            const newBoard = this.boardRepository.create({ ...board, user })
            return await this.boardRepository.save(newBoard);
        } catch (error) {
            console.log('errrrr', error)
            if (error.code === '23505') {
                throw new BadRequestException("Board name already exists")
            }
            throw error
        }
    }

}
