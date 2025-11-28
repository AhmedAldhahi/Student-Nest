"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
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
        synchronize: true,
        logging: false,
        entities: [__dirname + "/entity/**/*.entity{.ts,.js}"],
        migrations: [],
        subscribers: [],
    }),
    _a);
