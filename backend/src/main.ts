import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// swagger doc
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// ws IO
import { IoAdapter } from '@nestjs/platform-socket.io';

import { ConfigService } from '@nestjs/config';

// imgs upload
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

// import { AuthModule } from './auth/auth.module';
// import { JwtService } from '@nestjs/jwt';
// authGuard
// import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Allow CORS
  app.enableCors({
    origin: 'http://localhost:3001', // fe url
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // might be more strict
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API documentation for the Blog backend.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Serve static files from the "uploads" directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Serve files under /uploads
  });

  // set authGuard as a global guard
  // const jwtService = app.select(AuthModule).get(JwtService);
  // app.useGlobalGuards(new AuthGuard(jwtService));

  // socket.io
  app.useWebSocketAdapter(new IoAdapter(app));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
