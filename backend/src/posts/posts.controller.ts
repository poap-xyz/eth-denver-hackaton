import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoreDataDto } from '../shared/storage/dto/store-data.dto';
import { EventsService } from '../events/events.service';
import { GetPostByIdDto } from './dto/get-post-by-id.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly eventsService: EventsService,
  ) {}

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

  @Get('/event/:eventId/')
  async getPostsByEvent(@Param() getPostByIdDto: GetPostByIdDto) {
    const event = await this.eventsService.findOne(getPostByIdDto.eventId);
    if (!event) {
      throw new NotFoundException();
    }
    return await this.postsService.findAllByEventId(getPostByIdDto.eventId);
  }
}
