import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';

/**
 * CommentsController
 *
 * Controller for managing comments on articles.
 */
@ApiTags('Comments')
@Controller('articles/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /**
   * Add a new comment to an article.
   *
   * @param {number} articleId - The ID of the article.
   * @param {string} content - The content of the comment.
   * @returns {Promise<any>} - The newly created comment.
   * @throws {BadRequestException} - If articleId or content is invalid.
   */
  @ApiOperation({ summary: 'Add a new comment to an article' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The ID of the article to which the comment will be added',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', description: 'Content of the comment' },
      },
      required: ['content'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid article ID or comment content.',
  })
  @Post()
  async addComment(
    @Param('id') articleId: number,
    @Body('content') content: string,
  ) {
    // Validate articleId
    if (!articleId || isNaN(articleId)) {
      throw new BadRequestException('Invalid article ID.');
    }

    // Validate content
    if (!content || typeof content !== 'string' || content.trim() === '') {
      throw new BadRequestException(
        'Content is required and must be a non-empty string.',
      );
    }

    return this.commentsService.addComment(articleId, content);
  }

  /**
   * Get all comments for an article.
   *
   * @param {number} articleId - The ID of the article.
   * @returns {Promise<any>} - A list of comments for the specified article.
   * @throws {BadRequestException} - If articleId is invalid.
   */
  @ApiOperation({ summary: 'Get all comments for an article' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'The ID of the article whose comments are being retrieved',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of comments for the specified article.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid article ID.',
  })
  @Get()
  async getComments(@Param('id') articleId: number) {
    // Validate articleId
    if (!articleId || isNaN(articleId)) {
      throw new BadRequestException('Invalid article ID.');
    }

    return this.commentsService.getComments(articleId);
  }
}
