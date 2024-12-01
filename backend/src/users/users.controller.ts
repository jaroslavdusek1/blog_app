import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body()
    createUserDto: {
      username: string;
      password: string;
      name: string;
      surname: string;
    },
  ) {
    // validations
    if (!createUserDto.username || typeof createUserDto.username !== 'string') {
      throw new BadRequestException(
        'Invalid username. It must be a non-empty string.',
      );
    }

    if (
      createUserDto.username.length < 3 ||
      createUserDto.username.length > 20
    ) {
      throw new BadRequestException(
        'Username must be between 3 and 20 characters long.',
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
      name: createUserDto.name,
      surname: createUserDto.surname,
    });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.usersService.findOne(userId);
  }

  @Patch('me/image')
  @UseGuards(AuthGuard)
  async updateImage(
    @Req() req,
    @Body('image') image: string,
  ): Promise<{ message: string }> {
    if (!image) {
      throw new BadRequestException('No image provided.');
    }

    // base64 validation
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    if (!base64Regex.test(image)) {
      throw new BadRequestException(
        'Invalid image format. Must be a Base64 string.',
      );
    }

    const userId = req.user.sub;
    // save b64 encoded image in db
    await this.usersService.updateImage(userId, image);

    return { message: 'Image updated successfully' };
  }
}
