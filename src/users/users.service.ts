import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

export class UsersService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findByName(firstName: string) {
    const user = await this.userRepository.findOne({ firstName });
    if (!user) {
      throw new Error('Not existing user');
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
