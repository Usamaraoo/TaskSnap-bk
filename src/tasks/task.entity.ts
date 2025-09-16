import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { ColumnEntity } from './column.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Index()
  @Column('float')
  position: number;

  @ManyToOne(() => ColumnEntity, (col) => col.tasks, { onDelete: 'CASCADE' })
  column: ColumnEntity;
}
