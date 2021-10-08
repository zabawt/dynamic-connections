import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable({ scope: Scope.REQUEST })
export class UsersService implements OnModuleInit {
  private userRepository: UserRepository;
  onModuleInit() {
    this.userRepository = this.moduleRef.get(UserRepository);
  }

  constructor(private moduleRef: ModuleRef) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
