import { Module } from '@nestjs/common';
import { VotesGateway } from './votes/votes.gateway';
import { VotesService } from './votes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VotesGateway, VotesService],
})
export class VotesModule {}
