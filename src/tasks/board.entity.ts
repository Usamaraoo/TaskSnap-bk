// tasks/board.entity.ts
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { ColumnEntity } from './column.entity';

@Entity('boards')
export class Board {
    @PrimaryGeneratedColumn('uuid') id: string;

    @OneToOne(() => User, (user) => user.board, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => ColumnEntity, (col) => col.board, { cascade: true })
    columns: ColumnEntity[];
}
