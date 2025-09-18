// create-task.dto.ts
import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsUUID,
    IsEnum,
} from 'class-validator';
import { TaskStatus } from '../task.entity';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(100, { message: 'Title must be at most 100 characters long' })
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(500, { message: 'Description must be at most 500 characters long' })
    description?: string;

    @IsUUID()
    board: string;

    @IsOptional()
    @IsEnum(['TODO', 'IN_PROGRESS', 'DONE'])
    status?: TaskStatus;
}
