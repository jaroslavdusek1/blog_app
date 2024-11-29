import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // secret from .env
      signOptions: { expiresIn: '1h' }, // token validity
    }),
  ],
  controllers: [AuthController],
  // providers: [AuthService, JwtStrategy],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
