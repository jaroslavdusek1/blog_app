import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { RedisClientType, createClient } from 'redis';

@WebSocketGateway({ cors: { origin: '*' } }) // allow cors
export class CommentsGateway {
  @WebSocketServer()
  server: Server;

  private redisClient: RedisClientType;

  constructor() {
    // redis connection
    this.redisClient = createClient({ url: 'redis://blog_redis:6379' });
    this.redisClient
      .connect()
      .catch((err) => console.error('Redis error:', err));

    this.redisClient.subscribe('comments', (message) =>
      console.log('Message from Redis:', message),
    );
  }

  @SubscribeMessage('newComment')
  async handleNewComment(@MessageBody() comment: any) {
    await this.redisClient.publish('comments', JSON.stringify(comment));
    this.server.emit('commentAdded', comment);
    console.log('Comment broadcasted:', comment);
  }
}

// import {
//   WebSocketGateway,
//   SubscribeMessage,
//   MessageBody,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { RedisClientType, createClient } from 'redis';

// @WebSocketGateway({ cors: true })
// export class CommentsGateway {
//   @WebSocketServer()
//   server: Server;

//   private redisClient: RedisClientType;

//   constructor() {
//     // redis connection
//     this.redisClient = createClient({
//       url: 'redis://blog_redis:6379',
//     });

//     this.redisClient.connect();
//   }

//   @SubscribeMessage('newComment')
//   async handleNewComment(@MessageBody() comment: any) {
//     // publish a new comment in to redis channel
//     await this.redisClient.publish('comments', JSON.stringify(comment));

//     // send a command through websocker
//     this.server.emit('commentAdded', comment);
//   }
// }
