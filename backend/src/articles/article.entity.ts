import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  perex: string;

  @Column('text')
  content: string;

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[]; // Přidáno pole comments

  @ManyToOne(() => User, (user) => user.articles)
  author: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
