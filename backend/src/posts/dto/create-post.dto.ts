import { IsEthereumAddress, IsString } from 'class-validator';

export class CreatePostDto {
  @IsEthereumAddress()
  accountId: string;
  @IsString()
  description: string;
}
