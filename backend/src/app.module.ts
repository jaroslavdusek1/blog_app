import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles/article.entity';
import { User } from './users/user.entity';
import { Comment } from './comments/comment.entity';
import { Vote } from './votes/vote.entity';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
import { PrismaModule } from './prisma/prisma.module';

import { AppGateway } from './app.gateway';

// graphQL
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
        // synchronize: false, // let all migs on prisma
        synchronize: true, // let all migs on prisma // DEVELOPMENT ONLY delete later
        // migrations: [join(__dirname, 'migrations/*.ts')], // adding paths for migrations
        // migrationsTableName: 'migrations', // migrations table
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // drive specification
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // automatically generate schema
      playground: true, // turn on GraphQL Playground - dev env
      debug: true, // display debug logs
    }),
    AuthModule, // auth
    ArticlesModule, // articles
    CommentsModule, // comments
    VotesModule, // votes
    UsersModule, // users
    PrismaModule, // prisma
  ],
  controllers: [AppController], // controller responsible for handling http requests
  providers: [AppService, AppGateway],
})
export class AppModule {}
