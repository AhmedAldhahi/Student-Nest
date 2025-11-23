import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost", // Or "127.0.0.1"
  port: 3306,        // <-- Port goes here
  password: process.env.DATABASE_Pass_DEv,
  username: process.env.DATABASE_USERNAME,
  database: "TEST",
//  url: process.env.DATABASE_URL,

  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});

