import { PartialType } from "@nestjs/mapped-types";
import { UserRegister } from "./register.dto";

export class UpdateUserDto extends PartialType(UserRegister) {}
