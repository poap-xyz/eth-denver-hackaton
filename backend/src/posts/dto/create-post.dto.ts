import { IsEthereumAddress, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsEthereumAddress()
  address: string;
  @IsPositive()
  @Type(() => Number)
  eventId: number;
  @IsString()
  description: string;
}
