import { IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    event_id: number;

    @Column()
    @IsOptional()
    up_vote: string;

    @Column()
    @IsOptional()
    down_vote: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
