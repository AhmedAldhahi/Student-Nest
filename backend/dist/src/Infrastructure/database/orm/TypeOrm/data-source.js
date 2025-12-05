"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
class AppDataSource {
    constructor() { }
    static getInstance() {
        return AppDataSource.RegistryHolder.instance;
    }
    static async initialize() {
        const dataSource = AppDataSource.getInstance();
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }
}
exports.AppDataSource = AppDataSource;
AppDataSource.RegistryHolder = (_a = class {
    },
    __setFunctionName(_a, "RegistryHolder"),
    _a.instance = new typeorm_1.DataSource({
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
            ? Number(process.env.DATABASE_PORT)
            : 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DB_DBNAME,
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        synchronize: false,
        logging: false,
        entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
        migrations: [],
        subscribers: [],
    }),
    _a);
