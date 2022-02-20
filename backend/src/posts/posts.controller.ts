import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  NotFoundException,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StoreDataDto } from '../shared/storage/dto/store-data.dto';
import { EventsService } from '../events/events.service';
import { GetPostByIdDto } from './dto/get-post-by-id.dto';
import { JwtAuthGuard } from '../accounts/auth-strategies/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly eventsService: EventsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Request() req,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user;
    const hasAddress = await this.eventsService.hasAddress(
      user.address,
      createPostDto.eventId,
    );

    if (!hasAddress) {
      throw new BadRequestException('ADDRESS_DOES_NOT_HAVE_TOKEN_FOR_EVENT');
    }
    const ipfs: StoreDataDto = {
      name: user.address,
      description: createPostDto.description,
      filename: file.originalname,
      buffer: file.buffer,
      type: file.mimetype,
    };
    return this.postsService.create(createPostDto, ipfs, user);
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
