import { HttpException, HttpStatus } from '@nestjs/common';

export class EventNotFoundError extends HttpException {
  constructor() {
    super('Event Not found', HttpStatus.NOT_FOUND);
  }
}
