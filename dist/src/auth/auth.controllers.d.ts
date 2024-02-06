import { AuthService } from './auth.services';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserRegister } from 'src/users/dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private jwtService;
    registerUser(registerUser: UserRegister): Promise<import("../users/entities/user.entity").User>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        user: import("../users/entities/user.entity").User;
        access_token: string;
        refresh_token: string;
    }>;
}
