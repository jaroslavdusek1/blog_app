import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VotesGateway } from './votes/votes.gateway';

@Injectable()
export class VotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly votesGateway: VotesGateway,
  ) {}

  async vote(commentId: number, voteType: string, ipAddress: string) {
    const newVote = await this.prisma.vote.create({
      data: {
        commentId,
        voteType,
        ipAddress,
      },
    });

    // broadcast
    this.votesGateway.handleNewVote(newVote);

    return newVote;
  }
}
