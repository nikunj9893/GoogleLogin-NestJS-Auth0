import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async getUsers(user: User): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username: username });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async createUser(user: User) {
    const hasedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hasedPassword;
    this.usersRepository.insert(user);
  }

  async updateUser(user: User) {
    this.usersRepository.save(user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
}
