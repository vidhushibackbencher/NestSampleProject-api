import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.modules';
import { dataSourceOptions } from 'db/data-source';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forRoot(
      dataSourceOptions
    ),
    AuthModule,
  ],
})
export class AppModule {}
