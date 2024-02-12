import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { AuthModule } from "./modules/auth.modules";
import { UsersModule } from "./modules/users.module";
// import { RolesGuard } from "./guards/role-guard";
import { CaslModule } from "./casl/casl.module";
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    CaslModule,
  ],
})
export class AppModule {}
