import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(private readonly postsService: PostsService) {}

  private static async findEventFromPOAPApi(id: number): Promise<Event | null> {
    const response = await fetch(`https://api.poap.xyz/events/id/${id}`);
    if (response.status !== 200) {
      return null;
    }
    return JSON.parse(await response.text());
  }

  async findOne(id: number): Promise<Event | null> {
    const event = await EventsService.findEventFromPOAPApi(id);
    event.posts = await this.postsService.findAllByEventId(id);
    return event;
  }
}
