import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Board } from './board.entity';
import { Task } from './task.entity';

export type ColumnType = 'TODO' | 'IN_PROGRESS' | 'DONE';

@Entity('columns')
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'enum', enum: ['TODO', 'IN_PROGRESS', 'DONE'] })
  type: ColumnType;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board: Board;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];
}
