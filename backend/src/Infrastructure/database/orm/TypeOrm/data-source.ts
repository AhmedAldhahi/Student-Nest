import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: process.env.DATABASE_Pass_DEv,
  database: "TEST",
  synchronize: true,
  logging: false,

  entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
  //dropSchema: true, // for dev only 

  migrations: [],
  subscribers: [],
});
