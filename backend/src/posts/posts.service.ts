import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostRepository) {}

  create(createPostDto: CreatePostDto, urlIPFS: string) {
    return this.postRepository.save({ ...createPostDto, urlIPFS });
  }

  findAll() {
    return `This action returns all posts`;
  }

  async findAllByEventId(eventId: number): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder()
      .where({ eventId })
      .getMany();
  }
}
