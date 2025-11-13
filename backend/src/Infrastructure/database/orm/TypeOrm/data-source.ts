import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST_RENDER,
  port: 5432,
  username: "studentnest_user",
  password: process.env.DATABASE_Pass_DEV_RENDER,
  database: "studentnest",
  synchronize: true,
  logging: false,

  entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
  //dropSchema: true, // for dev only

  migrations: [],
  subscribers: [],
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});
