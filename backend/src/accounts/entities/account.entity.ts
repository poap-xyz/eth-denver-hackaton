import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEthereumAddress } from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    private _id: number;

    @Column('varchar', { length: 42, nullable: false })
    private _address: string;


    get id(): number {
        return this._id;
    }

    get address(): string {
        return this._address;
    }
}
