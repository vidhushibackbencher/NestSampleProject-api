import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { DataSource,DataSourceOptions } from 'typeorm'; 
import {config} from 'dotenv'
config()
export const dataSourceOptions:DataSourceOptions =({
  type: 'postgres',
   host: 'localhost',
   port:5432, 
   username: 'postgres',
   password:'password',
   database: 'crudOperation',
  entities: ['dist/**/*entity{.ts,.js}'],
  migrations:['dist/db/migrations/*{.ts,.js}'],
  synchronize:true,
  logging:false,
  
});
const dataSource= new DataSource(dataSourceOptions);
export default dataSource;
