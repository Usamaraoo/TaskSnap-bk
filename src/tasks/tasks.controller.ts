import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dtos/create-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }
    // Create task
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createTask(@Body() body: CreateTaskDto, @Req() req) {
        const userId = req.user.id;
        console.log('userId', userId)
        return await this.taskService.createTask(body, userId)
    }

    // Create board
    @Post('board')
    @UseGuards(JwtAuthGuard)
    async createBoard(@Body() body: CreateBoardDto, @Req() req) {
        const userId = req.user.id;
        return await this.taskService.createBoard(body, userId)
    }
    // Get board
    @Get('board')
    @UseGuards(JwtAuthGuard)
    async getUserBoard(@Req() req) {
        const userId = req.user.id;
        return await this.taskService.getUserBoard(userId)
    }
    @Get('tasks/:boardId')
    @UseGuards(JwtAuthGuard)
    async getUserTasks(@Param('boardId') boardId: string) {
        console.log('boardId:', boardId);
        return await this.taskService.getUserTasks(boardId);
    }

}
