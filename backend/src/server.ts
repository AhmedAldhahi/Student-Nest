import express from "express";
import helmet from "helmet";
import "dotenv/config";
import morgan from "morgan";
import winston from "winston";
import expressWinston from "express-winston";
import debug from "debug";
import { AppDataSource } from "./Infrastructure/database/orm/TypeOrm/data-source";
import { setupSwagger } from "./Presentation/documentation/swagger/swagger.config";
import { createAuthRouter } from "./Presentation/http/routes/Registeration.route";
import { buildControllers } from "./Presentation/http/controllers/index.controller";

export class Server {
  public app = express();
  public port = parseInt(process.env.PORT || "4000", 10);

  private startupDebug = debug("app:startup");
  private dbDebug = debug("app:db");
  private httpDebug = debug("app:http");

  async configure() {
    //  Database debug
    try {
      await AppDataSource.initialize();
      this.dbDebug("Database connected successfully.");
    } catch (error) {
      this.dbDebug("Database connection failed: %O", error);
      throw error;
    }

    // Express middleware
    this.app.use(express.json());

    //  Morgan debug logging
    this.app.use(
      morgan("dev", {
        stream: {
          write: (message) => this.httpDebug(message.trim()),
        },
      })
    );

    // Request logging (Winston)
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

    this.app.use(helmet());

    const { authController } = buildControllers();
    this.app.use("/api/v1/auth", createAuthRouter(authController));

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
