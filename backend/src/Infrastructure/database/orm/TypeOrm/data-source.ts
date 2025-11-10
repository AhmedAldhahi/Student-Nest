import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "shuttle.proxy.rlwy.net",
  port: 42031,
  username: "root",
  password: process.env.DATABASE_Pass,
  database: "railway",
  synchronize: true,
  logging: false,

  entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
  dropSchema: true,

  migrations: [],
  subscribers: [],
});
