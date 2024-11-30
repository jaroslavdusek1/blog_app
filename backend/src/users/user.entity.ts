import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Article } from '../articles/article.entity';

@Entity({ name: 'Users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  @Field(() => String)
  role: string;

  @OneToMany(() => Article, (article) => article.author)
  @Field(() => [Article], { nullable: true })
  articles: Article[];

  @Column()
  name: string;

  @Column()
  surname: string;
}
