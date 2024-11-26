import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Article } from '../articles/article.entity';
import { Vote } from '../votes/vote.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];
}
