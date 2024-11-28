import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CommentsGateway } from './comments/comments.gateway';
import { CommentsResolver } from './comments.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsGateway, CommentsResolver],
})
export class CommentsModule {}
