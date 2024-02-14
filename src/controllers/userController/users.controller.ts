import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
  Get,
  Delete,
  Param,
  Patch,
} from "@nestjs/common";
import { UsersService } from "../../services/userService/users.service";
import { UserRegister } from "../../dto/register.dto";
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
  @Get("/all")
  findAll(@Req() req: any) {
    const user = req.user;
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read, User);

      return this.userService.findAll();
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch("update/:id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const user = req.user;
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read, User);

      return this.userService.update(+id, updateUserDto);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/delete/:id")
  remove(@Param("id") id: number, @Req() req: any) {
    const user = req.user;
    const ability = this.abilityFactory.defineAbility(user);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Delete, User);

      return this.userService.remove(+id, req);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
