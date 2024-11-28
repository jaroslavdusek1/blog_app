import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Article } from '../articles/article.entity';

@Entity()
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

  @Column()
  @Field(() => String)
  role: string;

  @OneToMany(() => Article, (article) => article.author)
  @Field(() => [Article], { nullable: true })
  articles: Article[];
}
