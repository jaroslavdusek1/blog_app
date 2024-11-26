import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.articlesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.articlesService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articlesService.delete(+id);
  }
}
