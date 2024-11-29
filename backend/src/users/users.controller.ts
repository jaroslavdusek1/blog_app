import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() createUserDto: { username: string; password: string },
  ) {
    // validations
    if (!createUserDto.username || typeof createUserDto.username !== 'string') {
      throw new BadRequestException(
        'Invalid username. It must be a non-empty string.',
      );
    }

    if (
      createUserDto.username.length < 5 ||
      createUserDto.username.length > 20
    ) {
      throw new BadRequestException(
        'Username must be between 5 and 20 characters long.',
      );
    }

    // pw validation
    if (!createUserDto.password || typeof createUserDto.password !== 'string') {
      throw new BadRequestException(
        'Invalid password. It must be a non-empty string.',
      );
    }

    if (createUserDto.password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long.',
      );
    }

    // check pw validity, 1 lower, upper case and num
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(createUserDto.password)) {
      throw new BadRequestException(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.usersService.createUser({
      username: createUserDto.username,
      password: hashedPassword,
    });
  }
}
