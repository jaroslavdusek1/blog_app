import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comment])
  async comments(@Args('articleId') articleId: number) {
    return this.commentsService.getComments(articleId);
  }

  @Mutation(() => Comment)
  async addComment(
    @Args('articleId') articleId: number,
    @Args('content') content: string,
  ) {
    return this.commentsService.addComment(articleId, content);
  }
}
