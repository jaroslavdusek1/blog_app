import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './article.entity';
import { ArticlesResolver } from './articles.resolver';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Article]), AuthModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesResolver], // adding resolver
})
export class ArticlesModule {}
