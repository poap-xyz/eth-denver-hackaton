import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reaction } from '../../reaction/entities/reaction.entity';

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
  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions: Reaction[]; //TODO ADD Relations relationship
}
