import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
  reactions: string; //TODO ADD Relations relationship @OneToMany(() => Reaction, reaction => account.accountId)
}