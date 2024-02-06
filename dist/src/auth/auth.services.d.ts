import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegister } from 'src/users/dto/register.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    registerUser(userRegister: UserRegister): Promise<User>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        user: User;
        access_token: string;
        refresh_token: string;
    }>;
}
