import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
const configService = new ConfigService();

export const config = (): Record<string, any> => ({
  type: 'postgres',
  host: 'localhost',
  //configService.get<string>('DB_HOST'),
  port: 5432,
  //configService.get<number>('DB_PORT'),
  username: 'postgres',
  //configService.get<string>('DB_USERNAME'),
  password: 'password',
  //configService.get<string>('DB_PASSWORD'),
  database: 'crudOperation',
  //configService.get<string>('DB_DATABASE'),
  entities: [User],
});
