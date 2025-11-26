"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const debug_1 = __importDefault(require("debug"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./Infrastructure/database/orm/TypeOrm/data-source");
const swagger_config_1 = require("./Presentation/documentation/swagger/swagger.config");
const Registeration_route_1 = require("./Presentation/http/routes/registeration/Registeration.route");
const index_controller_1 = require("./Presentation/http/controllers/index.controller");
const Verfication_route_1 = require("./Presentation/http/routes/registeration/Verfication.route");
const PasswordRecvery_route_1 = require("./Presentation/http/routes/registeration/PasswordRecvery.route");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "4000", 10);
        this.startupDebug = (0, debug_1.default)("app:startup");
        this.dbDebug = (0, debug_1.default)("app:db");
        this.httpDebug = (0, debug_1.default)("app:http");
    }
    async configure() {
        this.app.use((req, res, next) => {
            console.log("🔥 REQUEST HIT SERVER:", req.method, req.url);
            next();
        });
        try {
            await data_source_1.AppDataSource.initialize();
            this.dbDebug("Database connected successfully.");
        }
        catch (error) {
            this.dbDebug("Database connection failed: %O", error);
            throw error;
        }
        this.app.use((0, morgan_1.default)("dev", {
            stream: {
                write: (message) => this.httpDebug(message.trim()),
            },
        }));
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((err, req, res, next) => {
            if (err instanceof SyntaxError && "body" in err) {
                return res.status(400).json({
                    error: "Invalid JSON payload",
                    message: err.message,
                });
            }
            next();
        });
        this.app.use(express_winston_1.default.logger({
            transports: [
                new winston_1.default.transports.File({
                    filename: "logs/requests.log",
                    level: "info",
                }),
            ],
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
        }));
        this.app.options("*", (0, cors_1.default)());
        this.app.use((0, cors_1.default)({
            origin: ["http://localhost:5173", "http://localhost:8081", "http://localhost:4000"],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true,
        }));
        const { authController, verificationController, passwordRecoverController, } = (0, index_controller_1.buildControllers)();
        this.app.use("/api/v1/auth", (0, Registeration_route_1.createAuthRouter)(authController));
        this.app.use("/api/v1/", (0, Verfication_route_1.createVerficationRouter)(verificationController));
        this.app.use("/api/v1/password-recovery", (0, PasswordRecvery_route_1.PasswordRecoveryRouter)(passwordRecoverController));
        (0, swagger_config_1.setupSwagger)(this.app);
        this.startupDebug("Server configuration completed.");
    }
    async start() {
        await this.configure();
        this.app.listen(this.port, () => {
            this.startupDebug(`Server running on http://localhost:${this.port}`);
            this.startupDebug(`Swagger at http://localhost:${this.port}/api-docs`);
        });
    }
}
exports.Server = Server;
