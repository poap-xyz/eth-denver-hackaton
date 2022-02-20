import {IsEthereumAddress, IsHexadecimal, IsString} from "class-validator";

export class LoginDto {
    @IsEthereumAddress()
    public readonly address: string;

    @IsHexadecimal()
    public readonly signature: string;

    @IsString()
    public readonly message: string;

}
