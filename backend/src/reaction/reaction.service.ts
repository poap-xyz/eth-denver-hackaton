import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction } from './entities/reaction.entity';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  async vote({ post_id, address }: { post_id: number; address: string }) {
    const reaction = await this.reactionRepository.findOne({
      post_id: post_id,
      address: address,
    });
    if (reaction) {
      const vote = reaction.vote * -1;
      await this.reactionRepository.update(
        {
          address: address,
          post_id: post_id,
        },
        {
          vote: vote,
        },
      );
    } else {
      await this.reactionRepository.save({
        post_id: post_id,
        address: address,
        vote: 1,
      });
    }
  }

  findAll() {
    return this.reactionRepository.find();
  }

  findOne(id: number) {
    return this.reactionRepository.findOne(id);
  }
}
