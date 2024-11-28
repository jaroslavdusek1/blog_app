import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql'; // annotations
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
@ObjectType() // mark class as GraphQL object type
export class Article {
  @PrimaryGeneratedColumn()
  @Field(() => Number) // GraphQL field type number
  id: number;

  @Column()
  @Field(() => String) // GraphQL field type string
  title: string;

  @Column()
  @Field(() => String) // GraphQL field type string
  perex: string;

  @Column('text')
  @Field(() => String) // GraphQL field type string
  content: string;

  @OneToMany(() => Comment, (comment) => comment.article)
  @Field(() => [Comment], { nullable: true }) // // GraphQL field type List<Comment>
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.articles)
  @Field(() => User, { nullable: true }) // GraphQL field type User
  author: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date) // GraphQL field type Date
  createdAt: Date;
}
