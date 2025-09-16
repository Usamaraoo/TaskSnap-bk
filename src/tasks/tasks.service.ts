import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/create-board.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Board)
        private userRepository: Repository<Board>,
    ) { }

    async createBoard(board: CreateBoardDto,userId:string): Promise<Board | null> {
        return null
    }

}
