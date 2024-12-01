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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '../auth/auth.guard';

/**
 * UsersController
 *
 * Handles user registration, profile management, and other user-specific actions.
 */
@ApiTags('Users') // Swagger grouping
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Register a new user.
   *
   * @param {Object} createUserDto - The data for creating a new user.
   * @returns {Promise<Object>} - Confirmation of user creation.
   * @throws {BadRequestException} - If input validation fails.
   */
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Unique username, between 3-20 characters.',
        },
        password: {
          type: 'string',
          description:
            'Password with at least one uppercase letter, one lowercase letter, and one number.',
        },
        name: { type: 'string', description: 'User’s first name.' },
        surname: { type: 'string', description: 'User’s last name.' },
      },
      required: ['username', 'password', 'name', 'surname'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully registered the user.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or invalid data.',
  })
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
    // Username validation
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

    // Password validation
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

  /**
   * Get the profile of the authenticated user.
   *
   * @param {any} req - The HTTP request object.
   * @returns {Promise<Object>} - The user’s profile data.
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user profile.',
  })
  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.usersService.findOne(userId);
  }

  /**
   * Update the profile image of the authenticated user.
   *
   * @param {any} req - The HTTP request object.
   * @param {string} image - The new Base64-encoded image.
   * @returns {Promise<Object>} - Confirmation of image update.
   * @throws {BadRequestException} - If the image is missing or invalid.
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile image for the authenticated user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          description: 'Base64-encoded image string.',
        },
      },
      required: ['image'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Profile image updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or invalid image format.',
  })
  @UseGuards(AuthGuard)
  @Patch('me/image')
  async updateImage(
    @Req() req,
    @Body('image') image: string,
  ): Promise<{ message: string }> {
    if (!image) {
      throw new BadRequestException('No image provided.');
    }

    // Base64 validation
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    if (!base64Regex.test(image)) {
      throw new BadRequestException(
        'Invalid image format. Must be a Base64 string.',
      );
    }

    const userId = req.user.sub;
    await this.usersService.updateImage(userId, image);

    return { message: 'Image updated successfully' };
  }
}
