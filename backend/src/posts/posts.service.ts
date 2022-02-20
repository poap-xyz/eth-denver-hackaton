import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './posts.repository';
import { StorageService } from '../shared/storage/storage.service';
import { StoreDataDto } from '../shared/storage/dto/store-data.dto';
import { Post } from './entities/post.entity';
import { EventsService } from '../events/events.service';

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostRepository,
    @Inject('STORAGE_SERVICE') private storageService: StorageService,
    private eventService: EventsService,
  ) {}

  async create(createPostDto: CreatePostDto, ipfs: StoreDataDto) {
    const eventId = createPostDto.eventId;
    const event = this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException();
    }
    const urlIPFS = await this.storageService.store(ipfs);
    return await this.postRepository.save({
      address: createPostDto.address,
      description: createPostDto.address,
      event: eventId,
      account: createPostDto.address,
      urlIPFS,
    });
  }

  async findAllByEventId(eventId: number): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder()
      .where({ eventId })
      .getMany();
  }
}
