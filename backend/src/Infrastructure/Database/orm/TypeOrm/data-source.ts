import { DataSource } from "typeorm";

export class AppDataSource {
  // Private constructor to prevent instantiation
  private constructor() {}

  // Static inner class to hold the instance of DataSource
  private static RegistryHolder = class {
    static instance = new DataSource({
      type: "mysql",
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT
        ? Number(process.env.DATABASE_PORT)
        : 3306, // Convert the port to a number
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DB_DBNAME,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      synchronize: true,
      logging: false,
      entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
      migrations: [],
      subscribers: [],
    });
  };

  public static getInstance(): DataSource {
    return AppDataSource.RegistryHolder.instance;
  }

  public static async initialize(): Promise<void> {
    const dataSource = AppDataSource.getInstance();
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
  }
}
