import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Article } from '../articles/article.entity';
import { Vote } from '../votes/vote.entity';

@Entity({ name: 'Comments' }) // db name
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  @Field(() => Article)
  article: Article;

  @OneToMany(() => Vote, (vote) => vote.comment)
  @Field(() => [Vote], { nullable: true })
  votes: Vote[];
}
