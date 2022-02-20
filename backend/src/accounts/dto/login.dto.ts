import {
  IsEthereumAddress,
  IsHexadecimal,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEthereumAddress()
  @IsNotEmpty()
  address: string;

  @IsHexadecimal()
  @IsNotEmpty()
  signature: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
