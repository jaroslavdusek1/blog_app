import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, generateThumbnail } from '../../multer.config';
import { File as MulterFile } from 'multer';
import * as fs from 'fs';
import { AuthGuard } from '../auth/auth.guard';

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

  @Get('user')
  @UseGuards(AuthGuard)
  findAllByAuthor(@Req() req: any) {
    const userId = req.user.sub;
    return this.articlesService.findAllByAuthor(userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @Body() body: any,
    @UploadedFile() file: MulterFile,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    const articleData = {
      ...body,
      authorId: userId,
      image: file?.filename || null,
    };

    if (file) {
      const uploadDir = './uploads/thumbnails';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const originalPath = `./uploads/${file.filename}`;
      const thumbnailPath = `${uploadDir}/${file.filename}`;
      await generateThumbnail(originalPath, thumbnailPath);
      articleData.thumbnail = `/uploads/thumbnails/${file.filename}`;
    }

    return this.articlesService.create(articleData);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file: MulterFile,
  ) {
    const articleData = {
      ...body,
      image: file?.filename || body.image || null,
    };

    if (file) {
      const uploadDir = './uploads/thumbnails';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const originalPath = `./uploads/${file.filename}`;
      const thumbnailPath = `${uploadDir}/${file.filename}`;
      await generateThumbnail(originalPath, thumbnailPath);
      articleData.thumbnail = `/uploads/thumbnails/${file.filename}`;
    }

    return this.articlesService.update(+id, articleData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.articlesService.delete(+id);
  }
}
