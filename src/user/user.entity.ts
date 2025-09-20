// src/user/user.entity.ts
import { Board } from 'src/tasks/board.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string; // You will hash this password
  @OneToOne(() => Board, (board) => board.user)
  board: Board;
}
