import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Res,
  Request,
  HttpException,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { AuthService } from "../../services/auth/auth.services";
// import { JwtService } from "@nestjs/jwt";
import { UserRegister } from "src/dto/register.dto";

import { LoginUserDto } from "src/dto/login-user.dto";
import { LocalAuthGuard } from "src/guards/local-auth.guard";
import { JwtAuthGuard } from "src/guards/jwt-auth.gurad";
import { RefreshJwtGuard } from "src/guards/refresh-auth-guard";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  registerUser(@Body() registerUser: UserRegister) {
    return this.authService.registerUser(registerUser);
  }
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.loginUser(loginUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    try {
      const { id, name, address, userName } = req.user;
      const userProfile = { id, name, address, userName };
      return { message: "Profile retrieved successfully", data: userProfile };
    } catch (error) {
      throw new HttpException(
        { message: "Internal Server Error", error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refrshToken(@Request() req) {
    return this.authService.refreshUser(req.user);
  }

  @Get("/logout")
  logoutUser(@Request() req) {
    console.log(req.session);
    req.session.destroy();
    return { msg: "The user session has ended" };
  }
}
