import express from "express";
import helmet from "helmet";
import "dotenv/config";
import morgan from "morgan";
import winston from "winston";
import expressWinston from "express-winston";
import debug from "debug";
import cors from "cors";
import { AppDataSource } from "./Infrastructure/database/orm/TypeOrm/data-source";
import { setupSwagger } from "./Presentation/documentation/swagger/swagger.config";
import { createAuthRouter } from "./Presentation/http/routes/registeration/Registeration.route";
import { buildControllers } from "./Presentation/http/controllers/index.controller";
import { createVerficationRouter } from "./Presentation/http/routes/registeration/Verfication.route";
import { PasswordRecoveryRouter } from "./Presentation/http/routes/registeration/PasswordRecvery.route";
import { profileRouter } from "./Presentation/http/routes/profile.routes";
export class Server {
  public app = express();
  public port = parseInt(process.env.PORT || "4000", 10);

  private startupDebug = debug("app:startup");
  private dbDebug = debug("app:db");
  private httpDebug = debug("app:http");

  async configure() {
    this.app.use((req, res, next) => {
      console.log("🔥 REQUEST HIT SERVER:", req.method, req.url);
      next();
    });

    // Database
    try {
      await AppDataSource.initialize();
      this.dbDebug("Database connected successfully.");
    } catch (error) {
      this.dbDebug("Database connection failed: %O", error);
      throw error;
    }

    // Logging - Morgan FIRST
    this.app.use(
      morgan("dev", {
        stream: {
          write: (message) => this.httpDebug(message.trim()),
        },
      })
    );

    // Security
    this.app.use(helmet());

    // Body parsers
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    // JSON parse error handler
    this.app.use((err: any, req: any, res: any, next: any) => {
      if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
          error: "Invalid JSON payload",
          message: err.message,
        });
      }
      next();
    });

    // Winston request logging
    this.app.use(
      expressWinston.logger({
        transports: [
          new winston.transports.File({
            filename: "logs/requests.log",
            level: "info",
          }),
        ],
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      })
    );

    this.app.options("*", cors());

    this.app.use(
      cors({
        origin: [
          "https://72.60.35.224:5173",
          "https://72.60.35.224:8081",
          "https://72.60.35.224:4000",
          "http://localhost:5173",
        ],
        methods: ["GET", "POST", "PUT", "DELETE ", "PATCH"],
        credentials: true,
      })
    );

    // Routes
    const {
      authController,
      verificationController,
      passwordRecoverController,
      profileController,
    } = buildControllers();
    this.app.use("/api/v1/auth", createAuthRouter(authController));
    this.app.use("/api/v1/", createVerficationRouter(verificationController));
    this.app.use("/api/v1/me/", profileRouter(profileController));

    this.app.use(
      "/api/v1/password-recovery",
      PasswordRecoveryRouter(passwordRecoverController)
    );

    // Swagger
    setupSwagger(this.app);

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
