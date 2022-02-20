import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

import { IsOptional } from 'class-validator';

@Entity()
@Unique(['post_id', 'address'])
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string; //TODO add account here

  @ManyToOne(() => Post, (post) => post._id, { eager: false })
  post: Post; 

  @Column()
  @IsOptional()
  vote: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
