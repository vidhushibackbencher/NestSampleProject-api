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
    UseGuards,
Request
  } from '@nestjs/common';
  import { AuthService } from './auth.services';
  import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserRegister } from 'src/users/dto/register.dto';
import { JwtService } from '@nestjs/jwt';

  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
    private jwtService: JwtService
  
    @Post('/register')
    registerUser(@Body() registerUser: UserRegister) {
      return this.authService.registerUser(registerUser);
    }
    @Post('/login')
     async loginUser(@Body() loginUserDto: LoginUserDto) {
   return await this.authService.loginUser(loginUserDto);
   
  }
 
 
  // @Get('/user')
  // authUser(@Req() req: Request, @Res() resp: Response) {
  //   return this.authService.authUser(req, resp);
  // }
  
  // @Post('/refresh')
  // refreshUser(@Req() req: Request, @Res() resp: Response) {
  //   return this.authService.refreshUser(req, resp);
  // }

//   @Get('/logout')
//   logoutUser(@Res() resp: Response) {
//     return this.authService.logoutUser(resp);
//   }
  }
  