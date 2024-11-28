import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './article.entity';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Query(() => [Article])
  async articles() {
    return this.articlesService.findAll();
  }

  @Mutation(() => Article)
  async createArticle(
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.articlesService.create({ title, content });
  }
}
