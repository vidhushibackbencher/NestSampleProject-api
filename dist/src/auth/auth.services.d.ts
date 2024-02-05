import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    registerUser(createUserDto: CreateUserDto): Promise<User>;
    loginUser(loginUserDto: LoginUserDto, resp: Response): Promise<Response<any, Record<string, any>>>;
    authUser(req: Request, resp: Response): Promise<Response<any, Record<string, any>>>;
    refreshUser(req: Request, resp: Response): Promise<Response<any, Record<string, any>>>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): void;
    remove(id: number): void;
}
