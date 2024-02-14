import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id } });
      console.log(existingUser);
      if (!existingUser) {
        throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
      }
      existingUser.name = updateUserDto.name;
      existingUser.userName = updateUserDto.userName;
      existingUser.password = updateUserDto.password;

      // Save the changes to the database
      const updatedUser = await this.userRepository.save(existingUser);

      // Optionally, you can return the updated user
      return updatedUser;
    } catch (error) {
      // Handle known HTTP exceptions
      if (error instanceof HttpException) {
        throw error;
      }

      // Handle unexpected errors with a generic message
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number, @Req() req: any) {
    try {
      const userId = await this.userRepository.findOne({ where: { id } });
      if (!userId) {
        throw new HttpException("Invalid Id.", HttpStatus.NOT_FOUND);
      }
      if (id !== req.user.id) {
        await this.userRepository.delete(+id);
        return { message: "user Delete successfully" };
      } else {
        throw new HttpException(
          "cannot delete itself",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
