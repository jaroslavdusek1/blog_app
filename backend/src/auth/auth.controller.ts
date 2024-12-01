import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

/**
 * AuthController
 *
 * Handles authentication-related operations, such as login.
 */
@ApiTags('Authentication') // Swagger grouping
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Authenticate a user and issue a JWT token.
   *
   * @param {Object} loginDto - The login credentials.
   * @param {string} loginDto.username - The username of the user.
   * @param {string} loginDto.password - The password of the user.
   * @returns {Promise<{ access_token: string; userId: number }>} - The JWT token and user ID.
   * @throws {BadRequestException} - If username or password is missing or invalid.
   * @throws {UnauthorizedException} - If credentials are incorrect.
   */
  @ApiOperation({ summary: 'Authenticate a user and issue a JWT token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'The username of the user' },
        password: { type: 'string', description: 'The password of the user' },
      },
      required: ['username', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully authenticated and issued a JWT token.',
  })
  @ApiResponse({
    status: 400,
    description: 'Missing or invalid credentials.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username or password.',
  })
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    // Validate username
    if (!loginDto.username || typeof loginDto.username !== 'string') {
      throw new BadRequestException(
        'Username is required and must be a string.',
      );
    }

    // Validate password
    if (!loginDto.password || typeof loginDto.password !== 'string') {
      throw new BadRequestException(
        'Password is required and must be a string.',
      );
    }

    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      userId: user.id,
    };
  }
}
