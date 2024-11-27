import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles/article.entity';
import { User } from './users/user.entity';
import { Comment } from './comments/comment.entity';
import { Vote } from './votes/vote.entity';

import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
import { PrismaModule } from './prisma/prisma.module';

import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      // handle env vars
      isGlobal: true, // available across the whole app
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // load values from .env
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // load db url
        entities: [Article, User, Comment, Vote],
        autoLoadEntities: true,
        synchronize: false, // let all migs on prisma
      }),
    }),
    AuthModule, // auth
    ArticlesModule, // articles
    CommentsModule, // comments
    VotesModule, // votes
    PrismaModule,
  ],
  controllers: [AppController], // controller responsible for handling http requests
  providers: [AppService, AppGateway],
})
export class AppModule {}
