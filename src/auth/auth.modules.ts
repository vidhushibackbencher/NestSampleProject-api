import { Module } from '@nestjs/common';
import { AuthService } from './auth.services';
import { AuthController } from './auth.controllers';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]),   JwtModule.register({
})],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
