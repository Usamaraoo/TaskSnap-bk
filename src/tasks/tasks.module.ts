import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Board } from './board.entity';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Board,Task])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
