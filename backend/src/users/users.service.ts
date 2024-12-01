import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: {
    username: string;
    password: string;
    name: string;
    surname: string;
  }) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  // user data
  async findOne(userId: number) {
    return this.userRepository.findOne({
      where: { id: userId },
      select: ['username', 'name', 'surname', 'role', 'image'],
    });
  }

  // update image
  async updateImage(userId: number, image: string): Promise<void> {
    await this.userRepository.update(userId, { image });
  }
}
