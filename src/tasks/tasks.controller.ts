import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dtos/create-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }
    @Post('Board')
    @UseGuards(JwtAuthGuard)
    async createBoard(@Body() body: CreateBoardDto, @Req() req) {
        const userId = req.user.id;
        return this.taskService.createBoard(body, userId)
    }
}
