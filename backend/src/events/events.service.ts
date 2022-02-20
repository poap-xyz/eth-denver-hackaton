import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './entities/event.entity';
import axios from 'axios';

@Injectable()
export class EventsService {
  constructor() {}

  private static async findEventFromPOAPApi(id: number): Promise<Event | null> {
    try {
      const response = await axios(`https://api.poap.xyz/events/id/${id}`);
      return await response.data;
    } catch (e) {
      return null;
    }
  }

  async findOne(id: number): Promise<Event | null> {
    const event = await EventsService.findEventFromPOAPApi(id);
    if (!event) {
      throw new NotFoundException();
    }
    //event.posts = await this.postsService.findAllByEventId(id);
    return event;
  }
}
