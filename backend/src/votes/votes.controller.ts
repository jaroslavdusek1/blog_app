import { Body, Controller, Param, Post } from '@nestjs/common';
import { VotesService } from './votes.service';

@Controller('comments/:id/vote')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  async vote(
    @Param('id') commentId: number,
    @Body('voteType') voteType: string,
    @Body('ipAddress') ipAddress: string,
  ) {
    return this.votesService.vote(commentId, voteType, ipAddress);
  }
}
