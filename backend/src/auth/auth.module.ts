import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { AuthGuard, PassportModule } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // secret from .env
      signOptions: { expiresIn: '12h' }, // token validity
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthGuard, AuthService],
})
export class AuthModule {}
