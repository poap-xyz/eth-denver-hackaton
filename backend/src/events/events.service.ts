import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventNotFoundError } from './exceptions/eventNotFound.error';

@Injectable()
export class EventsService {
  create(createEventDto: CreateEventDto) {
    const eventId = createEventDto.eventId;
    const event = this.findOne(eventId);
    if (!event) {
    }
  }

  private getEventFromAPI(eventId: number) {
    //TODO implement connection
    const event = null;
    if (!event) {
      throw new EventNotFoundError();
    }
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
