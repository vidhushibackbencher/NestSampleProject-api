import { BadRequestException, HttpException, HttpStatus, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { UserRegister } from 'src/users/dto/register.dto';
// import { UpdateUserDto } from '../users/dto/update-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
// import { Request,Response  } from 'express';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
    ) {}

  async registerUser(userRegister: UserRegister): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userRegister.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Email already registered!',
      );
    }

    try {
      const { name, email, password, address } = userRegister;

      const user = await this.userRepository.save({
        name,
        email,
        password: await bcryptjs.hash(password, 12),
        address,
      });
       delete user.password
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

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    if (!email?.trim() || !password?.trim()) {
     throw new BadRequestException({ message: 'Not all required fields have been filled in.' });
    }

    const user= await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
       throw new BadRequestException({ message: 'Invalid Credentials.' });
    }
delete user.password;
const payload = { sub: user.id, email: user.email};
const refreshTokenPayload = { sub: user.id };
return {
  user,
  access_token: await this.jwtService.signAsync(payload),
  refresh_token:await this.jwtService.signAsync(refreshTokenPayload, { expiresIn: '7d' }) 
};



  }




}
