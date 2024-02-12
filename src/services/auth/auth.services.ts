import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import * as bcryptjs from "bcryptjs";

import { JwtService } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { UserRegister } from "src/dto/register.dto";
import { User } from "src/models/user.entity";
import { UsersService } from "../userService/users.service";
import { LoginUserDto } from "src/dto/login-user.dto";

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userRegister: UserRegister): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { userName: userRegister.userName },
    });

    if (existingUser) {
      throw new BadRequestException("userName already registered!");
    }

    try {
      const { name, userName, password, address } = userRegister;

      const user = await this.userRepository.save({
        name,
        userName,
        password: await bcryptjs.hash(password, 12),
        address,
      });
      return user;
    } catch (error) {
      console.error(error);

      if (error === "23505") {
        console.error(`Unique constraint ${error.constraint} failed`);
        throw new HttpException(
          "There is already a user with this userName.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    if (!loginUserDto.userName?.trim() || !loginUserDto.password?.trim()) {
      throw new BadRequestException({
        message: "Not all required fields have been filled in.",
      });
    }

    const user = await this.userRepository.findOne({
      where: { userName: loginUserDto.userName },
    });

    if (
      !user ||
      !(await bcryptjs.compare(loginUserDto.password, user.password))
    ) {
      throw new BadRequestException({ message: "Invalid Credentials." });
    }
    const payload = {
      sub: user.id,
      userName: user.userName,
      isAdmin: user.isAdmin,
      address: user.address,
      name: user.name,
    };
    delete user.password;
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: "7d",
      }),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.find(username);
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (passwordMatch) {
        const { ...result } = user;
        delete user.password;
        return result;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }
  async refreshUser(user: User) {
    const payload = {
      userName: user.userName,
      sub: {
        name: user.name,
      },
    };
    console.log(payload, "payload");

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
