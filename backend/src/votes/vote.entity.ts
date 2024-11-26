import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ipAddress: string;

  @Column()
  voteType: string;

  @ManyToOne(() => Comment, (comment) => comment.votes)
  comment: Comment;
}
