"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const data_source_1 = require("./Infrastructure/database/orm/TypeOrm/data-source");
const swagger_config_1 = require("./documentation/swagger/swagger.config");
const Registeration_route_1 = require("./Presentation/http/routes/Registeration.route");
const Verfication_route_1 = require("./Presentation/http/routes/Verfication.route");
const PasswordRecvery_route_1 = require("./Presentation/http/routes/PasswordRecvery.route");
const index_controller_1 = require("./Presentation/http/controllers/index.controller");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "4000", 10);
    }
    async configure() {
        await data_source_1.AppDataSource.initialize();
        console.log("✅ Database connected.");
        this.app.use(express_1.default.json());
        const { authController, verficationController, passwordRecoverController } = (0, index_controller_1.buildControllers)();
        this.app.use("/api/v1/auth", (0, Registeration_route_1.createAuthRouter)(authController));
        this.app.use("/api/v1/verification", (0, Verfication_route_1.createVerficationRouter)(verficationController));
        this.app.use("/api/v1/recover-password", (0, PasswordRecvery_route_1.PasswordRecoveryRouter)(passwordRecoverController));
        (0, swagger_config_1.setupSwagger)(this.app);
    }
    async start() {
        await this.configure();
        this.app.listen(this.port, () => {
            console.log(`🚀 Server running on http://localhost:${this.port}`);
            console.log(`📄 Swagger at http://localhost:${this.port}/api-docs`);
        });
    }
}
exports.Server = Server;
