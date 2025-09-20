import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // @Column('float')
  // position: number;

  @Column({
    type: 'enum',
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  })
  status: TaskStatus;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board: Board;
}
