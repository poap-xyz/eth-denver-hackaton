import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['post_id', 'address'])
export class Reaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    post_id: number;

    @Column()
    @IsOptional()
    vote: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
