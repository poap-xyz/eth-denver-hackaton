import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from '../shared/storage/storage.module';
import { PostRepository } from './posts.repository';
import { EventsModule } from '../events/events.module';
import { ReactionModule } from '../reaction/reaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    StorageModule,
    EventsModule,
    ReactionModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
