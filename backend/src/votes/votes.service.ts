import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  async vote(commentId: number, voteType: string, ipAddress: string) {
    return this.prisma.vote.create({
      data: {
        commentId,
        voteType,
        ipAddress,
      },
    });
  }
}
