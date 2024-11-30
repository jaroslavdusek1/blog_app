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

@Entity({ name: 'Articles' })
@ObjectType() // mark class as GraphQL object type
export class Article {
  @PrimaryGeneratedColumn()
  @Field(() => Number) // GraphQL field type number
  id: number;

  @Column()
  @Field(() => String) // GraphQL field type string
  title: string;

  @Column({ nullable: true }) // Perex is optional
  @Field(() => String, { nullable: true }) // GraphQL field is optional
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

  @Column({ type: 'int', nullable: false }) // required
  authorId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date) // GraphQL field type Date
  createdAt: Date;

  @Column({ nullable: true })
  image: string;
}
