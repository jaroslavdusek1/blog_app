import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Comment } from '../comments/comment.entity';

@Entity({ name: 'Vote' })
@ObjectType()
export class Vote {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  ipAddress: string;

  @Column()
  @Field(() => String)
  voteType: string;

  @ManyToOne(() => Comment, (comment) => comment.votes)
  @Field(() => Comment)
  comment: Comment;
}
