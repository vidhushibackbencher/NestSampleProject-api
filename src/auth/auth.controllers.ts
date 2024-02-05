import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    Res,
    // Res,
  } from '@nestjs/common';
  import { AuthService } from './auth.services';
   import { CreateUserDto } from '../users/dto/create-user.dto';
  import { UpdateUserDto } from '../users/dto/update-user.dto';
  import { JwtService } from '@nestjs/jwt';
  import { LoginUserDto } from '../users/dto/login-user.dto';
  import { Response,Request } from 'express';
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
    private jwtService: JwtService
  
    @Post('/register')
    registerUser(@Body() registerUser: CreateUserDto) {
      return this.authService.registerUser(registerUser);
    }
    @Post('/login')
     loginUser(@Body() user: LoginUserDto, @Res() res: Response) {
    return this.authService.loginUser(user, res);
  }
  @Get('/user')
  authUser(@Req() req: Request, @Res() resp: Response) {
    return this.authService.authUser(req, resp);
  }
  
  @Post('/refresh')
  refreshUser(@Req() req: Request, @Res() resp: Response) {
    return this.authService.refreshUser(req, resp);
  }

//   @Get('/logout')
//   logoutUser(@Res() resp: Response) {
//     return this.authService.logoutUser(resp);
//   }
  }
  