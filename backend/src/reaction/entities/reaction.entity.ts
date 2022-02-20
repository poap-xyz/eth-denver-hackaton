import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string; //TODO add account here

  @ManyToOne(() => Post, (post) => post._id, { eager: false })
  post: Post; //TODO add relationship here eager false

  @Column()
  @IsOptional()
  up_vote: string;

  @Column()
  @IsOptional()
  down_vote: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
