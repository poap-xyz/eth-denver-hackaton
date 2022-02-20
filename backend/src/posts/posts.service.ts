import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './posts.repository';
import { StorageService } from '../shared/storage/storage.service';
import { StoreDataDto } from '../shared/storage/dto/store-data.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostRepository,
    @Inject('STORAGE_SERVICE') private storageService: StorageService,
  ) {}

  async create(createPostDto: CreatePostDto, ipfs: StoreDataDto) {
    const urlIPFS = await this.storageService.store(ipfs);
    return await this.postRepository.save({
      ...createPostDto,
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
