import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoreDataDto } from '../shared/storage/dto/store-data.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const ipfs: StoreDataDto = {
      name: createPostDto.address,
      description: createPostDto.description,
      filename: file.originalname,
      buffer: file.buffer,
    };
    return this.postsService.create(createPostDto, ipfs);
  }
}
