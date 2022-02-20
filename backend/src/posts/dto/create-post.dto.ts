import { IsEthereumAddress, IsString } from 'class-validator';

export class CreatePostDto {
  @IsEthereumAddress()
  address: string;
  @IsString()
  description: string;
}
