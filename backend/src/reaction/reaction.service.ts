import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reaction, VOTE } from './entities/reaction.entity';

@Injectable()
export class ReactionService {

  constructor(@InjectRepository(Reaction) private reactionRepository: Repository<Reaction>) {
  }

  async vote({ post_id, address, vote }: { post_id: number; address: string; vote?: VOTE }) {
    const reaction = await this.reactionRepository.findOne({ post_id: post_id, address: address });
    if (reaction) {
      const vote = reaction.vote * -1;
      await this.reactionRepository.update({
        address: address,
        post_id: post_id
      }, {
        vote: vote
      })
    } else {
      await this.reactionRepository.save({
        post_id: post_id,
        address: address,
        vote: vote || VOTE.POSITIVE
      })
    }
  }


  async getReactionByPostId({ post_id }: { post_id: number; }) {
    return await this.reactionRepository.find({ post_id: post_id })
  }

  findAll() {
    return this.reactionRepository.find();
  }

  findOne(id: number) {
    return this.reactionRepository.findOne(id);
  }
}
