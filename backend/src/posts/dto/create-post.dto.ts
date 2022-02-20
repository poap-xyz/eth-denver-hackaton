import { IsEthereumAddress, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsPositive()
  @Type(() => Number)
  eventId: number;
  @IsString()
  description: string;
}
