import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentsGateway } from './comments/comments.gateway';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commentsGateway: CommentsGateway,
  ) {}

  async addComment(articleId: number, content: string) {
    const newComment = await this.prisma.comment.create({
      data: {
        content,
        articleId,
      },
    });

    // Vyslání nového komentáře přes WebSocket
    this.commentsGateway.handleNewComment(newComment);

    return newComment;
  }

  async getComments(articleId: number) {
    return this.prisma.comment.findMany({
      where: { articleId },
      include: { article: true },
    });
  }
}
