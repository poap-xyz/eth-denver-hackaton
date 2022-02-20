
import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionService } from './reaction.service';

@Controller()
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) { }

  @Put('/post/:post_id/reactions')
  @HttpCode(204)
  async create(@Param('post_id') post_id: number, @Body() createReactionDto: CreateReactionDto) {
    await this.reactionService.vote({
      post_id: post_id,
      address: createReactionDto.address,
      vote: createReactionDto.vote
    })
  }

  @Get('/post/:id/reactions')
  async findOne(@Param('id') id: string) {
    const reaction = await this.reactionService.getReactionByPostId({ post_id: Number(id) });

    return {
      positives: reaction.filter(reaction => reaction.vote > 0).length,
      negatives: reaction.filter(reaction => reaction.vote < 0).length
    }
  }

}
