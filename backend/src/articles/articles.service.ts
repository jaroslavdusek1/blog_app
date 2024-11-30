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
    return this.articlesRepository.find();
  }

  findOne(id: number) {
    return this.articlesRepository.findOneBy({ id });
  }

  findAllByAuthor(authorId: number) {
    return this.articlesRepository.find({ where: { authorId } });
  }

  async findArticlesByAuthorId(authorId: number) {
    return this.articlesRepository.find({
      where: { authorId },
    });
  }

  create(article: Partial<Article>) {
    const newArticle = this.articlesRepository.create(article);
    return this.articlesRepository.save(newArticle);
  }

  async update(id: number, article: Partial<Article>) {
    await this.articlesRepository.update(id, article);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.articlesRepository.delete(id);
  }
}
