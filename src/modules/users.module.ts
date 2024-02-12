import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
// import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "dotenv";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory/casl-ability.factory";
import { UserController } from "src/controllers/userController/users.controller";
import { User } from "src/models/user.entity";
import { UsersService } from "src/services/userService/users.service";

config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "30s" },
    }),
  ],
  exports: [UsersService],
  controllers: [UserController],
  providers: [UsersService, CaslAbilityFactory],
})
export class UsersModule {}
