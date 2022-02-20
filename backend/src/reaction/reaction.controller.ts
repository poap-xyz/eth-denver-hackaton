import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionService } from './reaction.service';

@Controller('reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) { }

  @Post()
  async create(@Body() createReactionDto: CreateReactionDto) {
    const re = await this.reactionService.create(createReactionDto);
    console.log(re);
    return re;
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
