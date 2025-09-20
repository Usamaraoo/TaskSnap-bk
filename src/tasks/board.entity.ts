// tasks/board.entity.ts
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';

@Entity('boards')
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    title: string;

    @ManyToOne(() => User, (user) => user.board, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Task, (task) => task.board, { cascade: true })
    tasks: Task[];
}
