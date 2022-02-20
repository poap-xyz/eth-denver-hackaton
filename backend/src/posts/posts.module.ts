import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './posts.repository';
import { StorageModule } from '../shared/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), StorageModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
