import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostByIdDto {
  @IsPositive()
  @Type(() => Number)
  eventId: number;
}
