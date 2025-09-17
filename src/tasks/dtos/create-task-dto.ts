import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsOptional
} from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(100, { message: 'Title must be at most 100 characters long' })
    title: string;
    @IsString()
    @IsNotEmpty({ message: 'Board ID is required' })
    boardId: string;

    @IsOptional()
    @IsString()
    @MaxLength(500, { message: 'Description must be at most 500 characters long' })
    description?: string;
}
