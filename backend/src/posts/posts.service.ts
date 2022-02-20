import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './posts.repository';
import { StorageService } from '../shared/storage/storage.service';
import { StoreDataDto } from '../shared/storage/dto/store-data.dto';
import { Post } from './entities/post.entity';
import { EventsService } from '../events/events.service';
import { ReactionService } from '../reaction/reaction.service';

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostRepository,
    @Inject('STORAGE_SERVICE') private storageService: StorageService,
    private eventService: EventsService,
    private readonly reactionsService: ReactionService,
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
      description: createPostDto.description,
      eventId,
      accountId: createPostDto.address,
      urlIPFS,
    });
  }

  async findAllByEventId(eventId: number): Promise<Post[]> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .where({ eventId })
      .getMany();

    for (const index in posts) {
      const post = posts[index];
      post.reactions = await this.reactionsService.getReactionByPostId({
        post_id: post._id,
      });
    }
    return posts;
  }
}
