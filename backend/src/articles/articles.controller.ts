import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../auth/auth.guard';

/**
 * ArticlesController
 *
 * Handles CRUD operations for articles.
 */
@ApiTags('Articles') // Swagger grouping
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  /**
   * Fetch all articles.
   *
   * @returns {Promise<Article[]>} - List of all articles.
   */
  @ApiOperation({ summary: 'Fetch all articles' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all articles.',
  })
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  /**
   * Fetch a single article by ID.
   *
   * @param {string} id - The article ID.
   * @returns {Promise<Article>} - The article with the specified ID.
   * @throws {BadRequestException} - If the ID is invalid.
   */
  @ApiOperation({ summary: 'Fetch an article by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'The article ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the article.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid article ID.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id || isNaN(+id)) {
      throw new BadRequestException('Invalid article ID.');
    }
    return this.articlesService.findOne(+id);
  }

  /**
   * Fetch all articles by the authenticated user.
   *
   * @param {any} req - The HTTP request object.
   * @returns {Promise<Article[]>} - List of articles by the user.
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch all articles by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched articles by the user.',
  })
  @UseGuards(AuthGuard)
  @Get('user')
  findAllByAuthor(@Req() req: any) {
    const userId = req.user.sub;
    return this.articlesService.findArticlesByAuthorId(userId);
  }

  /**
   * Fetch all articles by a specific user.
   *
   * @param {string} userId - The user ID.
   * @returns {Promise<Article[]>} - List of articles by the specified user.
   */
  @ApiOperation({ summary: 'Fetch all articles by a specific user' })
  @ApiParam({ name: 'userId', type: 'string', description: 'The user ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched articles by the user.',
  })
  @Get('user/:userId')
  async getArticlesByUser(@Param('userId') userId: string) {
    if (!userId || isNaN(+userId)) {
      throw new BadRequestException('Invalid user ID.');
    }
    return await this.articlesService.findArticlesByAuthorId(+userId);
  }

  /**
   * Create a new article.
   *
   * @param {Object} body - The article data.
   * @param {any} req - The HTTP request object.
   * @returns {Promise<Article>} - The created article.
   * @throws {BadRequestException} - If required fields are missing or invalid.
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'The title of the article' },
        content: { type: 'string', description: 'The content of the article' },
        image: { type: 'string', description: 'An optional image URL' },
      },
      required: ['title', 'content'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the article.',
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: any, @Req() req: any) {
    const userId = req.user.sub;

    if (!body.title || typeof body.title !== 'string') {
      throw new BadRequestException('Title is required and must be a string.');
    }

    if (!body.content || typeof body.content !== 'string') {
      throw new BadRequestException('Content is required and must be a string.');
    }

    const articleData = {
      ...body,
      authorId: userId,
      image: body.image || null,
    };

    return await this.articlesService.create(articleData);
  }

  /**
   * Update an article by ID.
   *
   * @param {string} id - The article ID.
   * @param {Object} body - The updated article data.
   * @returns {Promise<Article>} - The updated article.
   * @throws {BadRequestException} - If the ID or fields are invalid.
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an article by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'The article ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'The title of the article' },
        content: { type: 'string', description: 'The content of the article' },
        image: { type: 'string', description: 'An optional image URL' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the article.',
  })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    if (!id || isNaN(+id)) {
      throw new BadRequestException('Invalid article ID.');
    }

    if (!body || typeof body !== 'object' || Object.keys(body).length === 0) {
      throw new BadRequestException('No fields to update were provided.');
    }

    if (body.title && typeof body.title !== 'string') {
      throw new BadRequestException('Title must be a string.');
    }

    if (body.content && typeof body.content !== 'string') {
      throw new BadRequestException('Content must be a string.');
    }

    const articleData = {
      ...body,
      image: body.image || null,
    };

    return await this.articlesService.update(+id, articleData);
  }

  /**
   * Delete an article by ID.
   *
   * @param {string} id - The article ID.
   * @returns {Promise<void>} - Confirmation of deletion.
   * @throws {BadRequestException} - If the ID is invalid.
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an article by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'The article ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the article.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid article ID.',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    if (!id || isNaN(+id)) {
      throw new BadRequestException('Invalid article ID.');
    }

    return this.articlesService.delete(+id);
  }
}
