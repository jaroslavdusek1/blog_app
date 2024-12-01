import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  findAll() {
    return this.articlesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.articlesRepository.findOneBy({ id });
  }

  async findArticlesByAuthorId(authorId: number) {
    return this.articlesRepository.find({
      where: { authorId },
      order: { createdAt: 'DESC' },
    });
  }

  async create(articleData: Partial<Article>): Promise<Article> {
    const article = this.articlesRepository.create(articleData);
    return await this.articlesRepository.save(article);
  }

  async update(id: number, articleData: any): Promise<Article> {
    await this.articlesRepository.update(id, articleData);
    return this.articlesRepository.findOneBy({ id });
  }

  delete(id: number) {
    return this.articlesRepository.delete(id);
  }
}
