import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { v4 as uuidV4 } from 'uuid';

import {User as UserEntity} from '../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    // 1. Hash password using argon2
    const hashedPassword = await argon2.hash(createUserDto.password);

    // 2. Create unique user ID
    const uniqueID = uuidV4();

    // 3. Prepare user data with hashed password and unique ID
    const userData = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      // 4. Save the new user to the database
      const savedUser = await this.userRepository.save(userData);
      return savedUser; // Return the saved user object
    } catch (err) {
      // 5. Handle any errors that may occur
      throw new HttpException('Unable to create account: ' + err.message, 400);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const userData =
      await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(
      existingUser,
      updateUserDto,
    );
    return await this.userRepository.save(
      userData,
    );
  }

  async remove(id: string): Promise<UserEntity> {
    const existingUser = await this.findOne(id);
    return await this.userRepository.remove(
      existingUser,
    );
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('User Not Found', 404);
    }
    return user;
  }
}
