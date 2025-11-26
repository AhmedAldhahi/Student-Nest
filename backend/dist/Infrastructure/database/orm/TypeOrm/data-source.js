"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
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
