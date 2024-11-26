import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
    constructor(private readonly prisma: PrismaService) { }

    async addComment(articleId: number, content: string) {
        return this.prisma.comment.create({
            data: {
                content,
                articleId,
            },
        });
    }

    async getComments(articleId: number) {
        return this.prisma.comment.findMany({
            where: { articleId },
            include: { article: true },
        });
    }

}
