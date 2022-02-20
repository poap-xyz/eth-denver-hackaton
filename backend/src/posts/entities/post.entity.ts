import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Reaction } from '../../reaction/entities/reaction.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  _id: string;
  @Column({ nullable: false, name: 'url_ipfs' })
  urlIPFS: string;
  @Column({ nullable: false })
  description: string;
  @Column({ name: 'account_id', nullable: false }) //TODO ADD Account entity relationship @ManyToOne(() => Account, account => account.address)
  accountId: string;
  reactions: Reaction[];
  @Column({ nullable: false, name: 'event_id' })
  eventId: number;
  @Column({ nullable: false, name: 'type' })
  type: string;
}
