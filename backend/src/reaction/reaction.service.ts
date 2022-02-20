import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Reaction } from './entities/reaction.entity';

@Injectable()
export class ReactionService {

  constructor(@InjectRepository(Reaction) private reactionRepository: Repository<Reaction>) {
  }

  create(createReactionDto: CreateReactionDto) {

    const reaction = {} as any;
    reaction.address = createReactionDto.address;
    reaction.event_id = createReactionDto.event_id;
    reaction.up_vote = "";
    reaction.down_vote = "";

    return this.reactionRepository.save(reaction);
  }

  findAll() {
    return this.reactionRepository.find();
  }

  findOne(id: number) {
    return this.reactionRepository.findOne(id);
  }
}
