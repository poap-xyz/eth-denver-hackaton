import { IsString, IsEthereumAddress } from 'class-validator';


export class CreatePostDto {
  @IsEthereumAddress()
  accountId: string;
  @IsString()
  description: string;
}
