import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dtos/create-task-dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Task) private taskRepository: Repository<Task>,
    ) { }
    // create new board
    async createBoard(board: CreateBoardDto, userId: number): Promise<Board | null> {
        try {
            const user = await this.userRepository.findOneBy({ id: userId })
            if (!user) {
                throw new NotFoundException('User not found')
            }
            const newBoard = this.boardRepository.create({ ...board, user })
            return await this.boardRepository.save(newBoard);
        } catch (error) {
            if (error.code === '23505') {
                throw new BadRequestException("Board name already exists")
            }
            throw error
        }
    }

    async createTask(body: CreateTaskDto, userId: number): Promise<Task | null> {
        const { board, } = body
        const userBoard = await this.boardRepository.findOne({
            where: { id: board },
            relations: ['user'],
        })
        if (!userBoard) {
            throw new NotFoundException("Board doesn't exists")
        }
        if (userBoard.user.id !== userId) {
            throw new NotFoundException("Board doesn't belong to this user")
        }
        const newTask = this.taskRepository.create({
            title: body.title,
            description: body.description,
            status: body.status ?? 'TODO',
            board: userBoard,
        });
        return await this.taskRepository.save(newTask);
    }

}
