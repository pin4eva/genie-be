import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  // For listing users
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepo.find();

      return users;
    } catch (error) {
      throw error;
    }
  }
}
