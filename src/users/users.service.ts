import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email already registered!',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const { name, email, password, address } = createUserDto;

      const user = await this.userRepository.save({
        name,
        email,
        password: await bcryptjs.hash(password, 12),
        address,
      });

      return user;
    } catch (error) {
      console.error(error);

      if (error === '23505') {
        console.error(`Unique constraint ${error.constraint} failed`);
        throw new HttpException(
          'There is already a user with this email.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Uncomment and implement these methods if needed
  // findAll() {
  //   return this.userRepository.find();
  // }

  // findOne(id: number) {
  //   return this.userRepository.findOne(id);
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   // Implement update logic here
  // }

  // remove(id: number) {
  //   // Implement remove logic here
  // }
}
