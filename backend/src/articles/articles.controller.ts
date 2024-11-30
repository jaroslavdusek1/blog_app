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
import { multerOptions, generateThumbnail } from '../uploads/multer.config';
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

  @Get('/user')
  findAllByAuthor(@Req() req: any) {
    const userId = req.user.id;
    return this.articlesService.findAllByAuthor(userId);
  }

  @Get('my')
  @UseGuards(AuthGuard)
  async findMyArticle(@Req() req: any) {
    const userId = req.user.id; // user id
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
    if (!body.title || !body.content) {
      throw new BadRequestException('Title and content are required');
    }
    const userId = req.user.sub;

    console.log('article data', {
      ...body,
      image: file?.filename || null,
      authorId: req.user.id,
    });

    if (file) {
      const uploadDir = './uploads/thumbnails';
      if (!fs.existsSync(uploadDir)) {
        console.log('file does not exist');

        fs.mkdirSync(uploadDir, { recursive: true }); // Ensure "thumbnails" directory exists
      }

      const originalPath = `./uploads/${file.filename}`;
      const thumbnailPath = `${uploadDir}/${file.filename}`;

      await generateThumbnail(originalPath, thumbnailPath);
      ({
        ...body,
        image: file?.filename || null,
        authorId: userId,
      }).thumbnail = `/uploads/thumbnails/${file.filename}`;
    }

    return this.articlesService.create({
      ...body,
      image: file?.filename || null,
      authorId: userId,
    });
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
