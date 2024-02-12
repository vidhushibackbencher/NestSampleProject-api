import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcryptjs from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UserRegister } from "src/dto/register.dto";
import { User } from "src/models/user.entity";
import { UpdateUserDto } from "src/dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(userRegister: UserRegister): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { userName: userRegister.userName },
    });

    if (existingUser) {
      throw new BadRequestException("Email already registered!");
    }

    try {
      const { name, userName, password, address } = userRegister;

      const user = await this.userRepository.save({
        name,
        userName,
        password: await bcryptjs.hash(password, 12),
        address,
      });
      delete user.password;
      return user;
    } catch (error) {
      console.error(error);

      if (error === "23505") {
        console.error(`Unique constraint ${error.constraint} failed`);
        throw new HttpException(
          "There is already a user with this email.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(userName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { userName } });
  }
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.userName = updateUserDto.userName;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
