import {
  Body,
  Inject,
  Injectable,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private postRepository: Repository<Post>;
  constructor(@Inject('POST_REPOSITORY') postRepository: Repository<Post>) {
    this.postRepository = postRepository;
  }

  create(createPostDto: CreatePostDto) {
    this.postRepository.create(createPostDto);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
