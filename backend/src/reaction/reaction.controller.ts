import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionService } from './reaction.service';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) { }

  @Post()
  @HttpCode(204)
  async create(@Body() createReactionDto: CreateReactionDto) {
    await this.reactionService.vote({
      post_id: createReactionDto.post_id,
      address: createReactionDto.address,
      vote: createReactionDto.vote
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const reaction = await this.reactionService.getReactionByPostId({ post_id: Number(id) });

    return {
      positives: reaction.filter(reaction => reaction.vote > 0).length,
      negatives: reaction.filter(reaction => reaction.vote < 0).length
    }
  }

}
