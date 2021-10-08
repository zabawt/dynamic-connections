import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends Repository<User> {}
