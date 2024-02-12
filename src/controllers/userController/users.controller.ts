import {
  Controller,
  // Get,
  Post,
  Body,
  Req,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  ForbiddenException,
  Get,
  Delete,
  Param,
  Patch,
} from "@nestjs/common";
import { UsersService } from "../../services/userService/users.service";

// import { UpdateUserDto } from "../../dto/update-user.dto";
import { UserRegister } from "../../dto/register.dto";
// import { Roles } from "../../utillity/common/user-roles-enum";
import { JwtAuthGuard } from "src/guards/jwt-auth.gurad";
import {
  Action,
  CaslAbilityFactory,
} from "src/casl/casl-ability.factory/casl-ability.factory";
import { User } from "src/models/user.entity";
import { ForbiddenError } from "@casl/ability";
import { UpdateUserDto } from "src/dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UsersService,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("/create")
  create(@Body() userRegisterDto: UserRegister, @Req() req: any) {
    const user = req.user;
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Create, User);

      return this.userService.create(userRegisterDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get("/")
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
