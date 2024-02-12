import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { AuthService } from "src/services/auth/auth.services";
import { UsersService } from "src/services/userService/users.service";
import { UsersModule } from "./users.module";
import { AuthController } from "src/controllers/authController/auth.controllers";
import { LocalStrategy } from "src/strategy/local-strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy/jwt-strategy";
import { RefreshJwtStrategy } from "src/strategy/refrehToken-strategy";

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    UsersService,
    RefreshJwtStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: "30s" },
    }),
    UsersModule,
    PassportModule,
  ],
})
export class AuthModule {}
