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
      address: createReactionDto.address
    })
  }

  @Get()
  findAll() {
    return this.reactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactionService.findOne(+id);
  }

}
