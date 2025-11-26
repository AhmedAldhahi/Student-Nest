import "reflect-metadata";
import { DataSource } from "typeorm";
// import * as dotenv from "dotenv";

// dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST, // Host should be set to the IP address from your .env file
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306, // Convert the port to a number
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB_DBNAME,
  extra: {
    ssl: {
      rejectUnauthorized: false, // Depending on whether you need SSL for your connection
    },
  },
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
});

