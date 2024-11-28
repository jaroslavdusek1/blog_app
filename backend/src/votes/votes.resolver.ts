import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { VotesService } from './votes.service';
import { Vote } from './vote.entity';

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private readonly votesService: VotesService) {}

  @Mutation(() => Vote)
  async vote(
    @Args('commentId') commentId: number,
    @Args('voteType') voteType: string,
    @Args('ipAddress') ipAddress: string,
  ) {
    return this.votesService.vote(commentId, voteType, ipAddress);
  }
}
