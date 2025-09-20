import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class UpdateTaskStatusDto {
    @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'], {
        message: 'Status must be either TODO, IN_PROGRESS or DONE',
    })
    status: TaskStatus;
}
