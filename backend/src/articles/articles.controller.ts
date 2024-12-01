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
import { ArticlesService } from './articles.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) { }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  findAllByAuthor(@Req() req: any) {
    const userId = req.user.sub;
    return this.articlesService.findAllByAuthor(userId);
  }

  @Get('user/:userId')
  async getArticlesByUser(@Param('userId') userId: string) {
    return await this.articlesService.findArticlesByAuthorId(+userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() body: any, @Req() req: any) {
    const userId = req.user.sub;

    if (!body.title || typeof body.title !== 'string') {
      throw new BadRequestException('Title is required and must be a string.');
    }

    if (!body.content || typeof body.content !== 'string') {
      throw new BadRequestException(
        'Content is required and must be a string.',
      );
    }

    const articleData = {
      ...body,
      authorId: userId,
      image: body.image || null,
    };

    return await this.articlesService.create(articleData);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    if (!id || isNaN(+id)) {
      throw new BadRequestException('Invalid article ID.');
    }

    return this.articlesService.delete(+id);
  }
}
