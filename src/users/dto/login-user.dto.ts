import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty({ message: "email can not be null." })
  @IsEmail({}, { message: "please provide a valid email." })
  email: string;

  @IsNotEmpty({ message: "Password can not be empty." })
  @MinLength(8, { message: "Password minimum  character should be 8." })
  password: string;
}
