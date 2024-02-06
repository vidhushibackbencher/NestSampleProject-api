import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserRegister{
@IsNotEmpty({message:'Name can not be null.'})
@IsString({message:'Name shoul be string.'})
name:string

@IsNotEmpty({message:'email can not be null.'})
@IsEmail({},{message:'please provide a valid email.'})
email:string

@IsNotEmpty({message:'Password can not be empty.'})
@MinLength(8,{message:'Password minimum  character should be 8.'})
password:string

@IsNotEmpty({message:'email can not be null'})
@IsString({message:"message should be string"})
address:string
}