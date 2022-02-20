import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './posts.repository';
import { StorageService } from '../shared/storage/storage.service';
import { StoreDataDto } from '../shared/storage/dto/store-data.dto';
import { Post } from './entities/post.entity';
import { EventsService } from '../events/events.service';
import { ReactionService } from '../reaction/reaction.service';
import { User } from '../accounts/entities/user.entity';
import {Event} from "../events/entities/event.entity";
import {ENSResolver} from "../shared/ens_resolver";

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostRepository,
    @Inject('STORAGE_SERVICE') private storageService: StorageService,
    private eventService: EventsService,
    private readonly reactionsService: ReactionService,
  ) {}

  async create(createPostDto: CreatePostDto, ipfs: StoreDataDto, user: User) {
    const eventId = createPostDto.eventId;
    const event = this.eventService.findOne(eventId);
    if (!event) {
      throw new NotFoundException();
    }
    const urlIPFS = await this.storageService.store(ipfs);
    return await this.postRepository.save({
      address: user.address,
      description: createPostDto.description,
      eventId,
      accountId: user.address,
      urlIPFS,
    });
  }

  async findOne(id: string): Promise<Post | null> {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException();
    }
    //event.posts = await this.postsService.findAllByEventId(id);
    return post;
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
      const ens = await ENSResolver.resolve({ addresses: [post.accountId] });

      post.accountId =
        ens.length > 0 && ens[0].valid ? ens[0].ens : post.accountId;
    }
    return posts;
  }
}
