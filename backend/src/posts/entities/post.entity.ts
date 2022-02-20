import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  _id: string;
  @Column({ nullable: false, name: 'url_ipfs' })
  urlIPFS: string;
  @Column({ nullable: false })
  description: string;
  @Column() //TODO ADD Account entity relationship @ManyToOne(() => Account, account => account.address)
  accountId: string;
  @Column()
  reactions: string;
  @Column({ nullable: false, name: 'event_id' })
  eventId: number;
}
