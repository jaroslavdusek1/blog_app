import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('articles/:id/comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    async addComment(
        @Param('id') articleId: number,
        @Body('content') content: string,
    ) {
        return this.commentsService.addComment(articleId, content);
    }

    @Get()
    async getComments(@Param('id') articleId: number) {
        return this.commentsService.getComments(articleId);
    }

}
