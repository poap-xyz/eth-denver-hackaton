import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByAddress(address: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { address } });
  }

  async create(address: string): Promise<User> {
    return await this.userRepository.save({ address: address });
  }
}
