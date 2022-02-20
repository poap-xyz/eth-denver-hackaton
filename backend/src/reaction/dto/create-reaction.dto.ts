import { IsEthereumAddress, IsNotEmpty } from "class-validator";

export class CreateReactionDto {
    @IsNotEmpty()
    @IsEthereumAddress()
    address: string;

    @IsNotEmpty()
    post_id: number;
}
