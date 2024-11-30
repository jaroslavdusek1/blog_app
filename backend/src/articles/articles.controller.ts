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
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions, generateThumbnail } from '../uploads/multer.config';
import { File as MulterFile } from 'multer';
import * as fs from 'fs';

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

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(@Body() body: any, @UploadedFile() file: MulterFile) {
    if (!body.title || !body.content) {
      throw new BadRequestException('Title and content are required');
    }

    console.log('body', body);

    const articleData: any = {
      ...body,
      image: file?.filename || null,
    };

    if (file) {
      const uploadDir = './uploads/thumbnails';
      if (!fs.existsSync(uploadDir)) {
        console.log('file does not exist');

        fs.mkdirSync(uploadDir, { recursive: true }); // Ensure "thumbnails" directory exists
      }

      const originalPath = `./uploads/${file.filename}`;
      const thumbnailPath = `${uploadDir}/${file.filename}`;

      await generateThumbnail(originalPath, thumbnailPath);
      articleData.thumbnail = `/uploads/thumbnails/${file.filename}`;
    }

    return this.articlesService.create(articleData);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file: MulterFile,
  ) {
    const articleData: any = {
      ...body,
      image: file?.filename || body.image || null,
    };

    if (file) {
      const uploadDir = './uploads/thumbnails';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      console.log('Uploaded file path:', file?.path);

      const originalPath = `./uploads/${file.filename}`;
      const thumbnailPath = `${uploadDir}/${file.filename}`;

      await generateThumbnail(originalPath, thumbnailPath);
      articleData.thumbnail = `/uploads/thumbnails/${file.filename}`;
    }

    return this.articlesService.update(+id, articleData);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articlesService.delete(+id);
  }
}
