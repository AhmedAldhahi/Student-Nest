import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
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
