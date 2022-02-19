import { IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsPositive()
  @Type(() => Number)
  eventId: number;
}
