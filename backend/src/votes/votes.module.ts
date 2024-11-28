import { Module } from '@nestjs/common';
import { VotesGateway } from './votes/votes.gateway';
import { VotesService } from './votes.service';
import { PrismaModule } from '../prisma/prisma.module';
import { VotesResolver } from './votes.resolver';

@Module({
  imports: [PrismaModule],
  providers: [VotesGateway, VotesService, VotesResolver],
})
export class VotesModule {}
