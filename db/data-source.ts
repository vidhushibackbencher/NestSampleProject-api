import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
config();
export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_LOCALHOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "crudOperation",
  entities: ["dist/**/*entity{.ts,.js}"],
  migrations: ["dist/db/migrations/*{.ts,.js}"],
  synchronize: true,
  logging: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
