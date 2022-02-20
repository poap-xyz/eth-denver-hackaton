import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from '../shared/database/database.module';
import { postProviders } from './post.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [...postProviders, PostsService],
})
export class PostsModule {}
