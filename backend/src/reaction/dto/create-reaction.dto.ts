import { IsEthereumAddress, IsNotEmpty, IsOptional } from "class-validator";
import { VOTE } from "../entities/reaction.entity";

export class CreateReactionDto {
    @IsNotEmpty()
    @IsEthereumAddress()
    address: string;

    @IsNotEmpty()
    post_id: number;

    @IsOptional()
    vote: VOTE
}
