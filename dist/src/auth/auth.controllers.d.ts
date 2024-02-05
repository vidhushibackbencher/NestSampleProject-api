import { AuthService } from './auth.services';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private jwtService;
    registerUser(registerUser: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    loginUser(user: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    authUser(req: Request, resp: Response): Promise<Response<any, Record<string, any>>>;
    refreshUser(req: Request, resp: Response): Promise<Response<any, Record<string, any>>>;
}
