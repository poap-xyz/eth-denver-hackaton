import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  controllers: [ReactionController],
  providers: [ReactionService],
  exports: [ReactionService]
})
export class ReactionModule { }
