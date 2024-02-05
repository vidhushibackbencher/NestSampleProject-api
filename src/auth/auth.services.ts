import { HttpException, HttpStatus, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request,Response  } from 'express';
import { sign, verify } from 'jsonwebtoken';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService) {}

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

  async loginUser(loginUserDto: LoginUserDto, resp: Response) {
    const { email, password } = loginUserDto;

    if (!email?.trim() || !password?.trim()) {
      return resp
        .status(500)
        .send({ message: 'Not all required fields have been filled in.' });
    }

    const userDB = await this.userRepository.findOne({ where: { email } });

    if (!userDB || !(await bcryptjs.compare(password, userDB.password))) {
      return resp.status(500).send({ message: 'Invalid Credentials.' });
    }

    const accessToken = sign({ id: userDB.id }, 'access_secret', {
      expiresIn: 60 * 60,
    });
    const refreshToken = sign({ id: userDB.id }, 'refresh_secret', {
      expiresIn: 24 * 60 * 60,
    });

    resp.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    resp.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    resp.status(200).send({ message: 'Login success.' });
  }

  async authUser(req: Request, resp: Response) {
    try {
      const accessToken = req.cookies['accessToken'];

      const payload: any = verify(accessToken, 'access_secret');

      if (!payload) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      return resp.status(200).send(user);
    } catch (error) {
      console.error(error);
      return resp.status(500).send({ message: error });
    }
  }


  async refreshUser(req: Request, resp: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];

      const payload:any = verify(refreshToken, 'refresh_secret');
console.log(payload,'payload')
      if (!payload) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      const accessToken = sign({ id: payload.id }, 'access_secret', {
        expiresIn: 60 * 60,
      });

      resp.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      resp.status(200).send({ message: 'refresh success.' ,
    refreshToken});
    } catch (error) {
      console.error(error);
      return resp.status(500).send({ message: error });
    }
  }


  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({where:{id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
   
  }

  remove(id: number) {

  }
}
