import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    registerUser(registerUser: CreateUserDto): Promise<import("./entities/user.entity").User>;
}
