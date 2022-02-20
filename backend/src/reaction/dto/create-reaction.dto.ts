import { IsEthereumAddress, IsNotEmpty } from "class-validator";

export class CreateReactionDto {
    @IsNotEmpty()
    @IsEthereumAddress()
    address: string;

    @IsNotEmpty()
    event_id: number;

    @IsNotEmpty()
    vote: string;
}
