import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RedisClientType, createClient } from 'redis';

@WebSocketGateway({ cors: true })
export class VotesGateway {
  @WebSocketServer()
  server: Server;

  private redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({
      url: 'redis://blog_redis:6379',
    });

    this.redisClient.connect().catch((err) => console.error(err));
  }

  @SubscribeMessage('newVote')
  async handleNewVote(@MessageBody() vote: any) {
    await this.redisClient.publish('votes', JSON.stringify(vote));
    this.server.emit('voteAdded', vote);
  }
}
