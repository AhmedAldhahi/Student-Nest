// import express from "express";
// import helmet from "helmet";
// import "dotenv/config";
// import morgan from "morgan";
// import winston from "winston";
// import expressWinston from "express-winston";
// import debug from "debug";
// import multer from "multer";
// import { AppDataSource } from "./Infrastructure/database/orm/TypeOrm/data-source";
// import { setupSwagger } from "./Presentation/documentation/swagger/swagger.config";
// import { createAuthRouter } from "./Presentation/http/routes/Registeration.route";
// import { buildControllers } from "./Presentation/http/controllers/index.controller";

// export class Server {
//   public app = express();
//   public port = parseInt(process.env.PORT || "4000", 10);

//   private startupDebug = debug("app:startup");
//   private dbDebug = debug("app:db");
//   private httpDebug = debug("app:http");

//   async configure() {
//     //  Database debug
//     try {
//       await AppDataSource.initialize();
//       this.dbDebug("Database connected successfully.");
//     } catch (error) {
//       this.dbDebug("Database connection failed: %O", error);
//       throw error;
//     }

//     //  Morgan debug logging
//     this.app.use(
//       morgan("dev", {
//         stream: {
//           write: (message) => this.httpDebug(message.trim()),
//         },
//       })
//     );

//     this.app.use(helmet());

//     // Express middleware
//     this.app.use(express.json());

//     // Request logging (Winston)
//     this.app.use(
//       expressWinston.logger({
//         transports: [
//           new winston.transports.File({
//             filename: "logs/requests.log",
//             level: "info",
//           }),
//         ],
//         format: winston.format.combine(
//           winston.format.timestamp(),
//           winston.format.json()
//         ),
//       })
//     );

//     const { authController } = buildControllers();
//     this.app.use("/api/v1/auth", createAuthRouter(authController));

//     setupSwagger(this.app);

//     this.startupDebug("Server configuration completed.");
//   }

//   async start() {
//     await this.configure();

//     this.app.listen(this.port, () => {
//       this.startupDebug(`Server running on http://localhost:${this.port}`);
//       this.startupDebug(`Swagger at http://localhost:${this.port}/api-docs`);
//     });
//   }
// }

// import express from "express";
// import helmet from "helmet";
// import "dotenv/config";
// import morgan from "morgan";
// import winston from "winston";
// import expressWinston from "express-winston";
// import debug from "debug";
// import multer from "multer";
// import { AppDataSource } from "./Infrastructure/database/orm/TypeOrm/data-source";
// import { setupSwagger } from "./Presentation/documentation/swagger/swagger.config";
// import { createAuthRouter } from "./Presentation/http/routes/Registeration.route";
// import { buildControllers } from "./Presentation/http/controllers/index.controller";

// export class Server {
//   public app = express();
//   public port = parseInt(process.env.PORT || "4000", 10);

//   private startupDebug = debug("app:startup");
//   private dbDebug = debug("app:db");
//   private httpDebug = debug("app:http");

//   async configure() {
//     // Database
//     try {
//       await AppDataSource.initialize();
//       this.dbDebug("Database connected successfully.");
//     } catch (error) {
//       this.dbDebug("Database connection failed: %O", error);
//       throw error;
//     }

//     // Logging - Morgan FIRST
//     this.app.use(
//       morgan("dev", {
//         stream: {
//           write: (message) => this.httpDebug(message.trim()),
//         },
//       })
//     );

//     // Security
//     this.app.use(helmet());

//     // Body parsers (before multer)
//     this.app.use(express.urlencoded({ extended: true }));
//     this.app.use(express.json());

//     // Multer for file buffer support
//     const upload = multer({ storage: multer.memoryStorage() });
//     this.app.use(upload.any());

//     // JSON parse error handler
//     this.app.use((err: any, req: any, res: any, next: any) => {
//       if (err instanceof SyntaxError && "body" in err) {
//         return res.status(400).json({
//           error: "Invalid JSON payload",
//           message: err.message,
//         });
//       }
//       next();
//     });

//     // Winston request logging
//     this.app.use(
//       expressWinston.logger({
//         transports: [
//           new winston.transports.File({
//             filename: "logs/requests.log",
//             level: "info",
//           }),
//         ],
//         format: winston.format.combine(
//           winston.format.timestamp(),
//           winston.format.json()
//         ),
//       })
//     );

//     // Routes
//     const { authController } = buildControllers();
//     this.app.use("/api/v1/auth", createAuthRouter(authController));

//     // Swagger
//     setupSwagger(this.app);

//     this.startupDebug("Server configuration completed.");
//   }

//   async start() {
//     await this.configure();

//     this.app.listen(this.port, () => {
//       this.startupDebug(`Server running on http://localhost:${this.port}`);
//       this.startupDebug(`Swagger at http://localhost:${this.port}/api-docs`);
//     });
//   }
// }

import express from "express";
import helmet from "helmet";
import "dotenv/config";
import morgan from "morgan";
import winston from "winston";
import expressWinston from "express-winston";
import debug from "debug";
import multer from "multer"; // Import once
import { AppDataSource } from "./Infrastructure/database/orm/TypeOrm/data-source";
import { setupSwagger } from "./Presentation/documentation/swagger/swagger.config";
import { createAuthRouter } from "./Presentation/http/routes/Registeration.route";
import { buildControllers } from "./Presentation/http/controllers/index.controller";
import { createVerficationRouter } from "./Presentation/http/routes/Verfication.route";
import { PasswordRecoveryRouter } from "./Presentation/http/routes/PasswordRecvery.route";
import { PasswordRecoverController } from "./Presentation/http/controllers/PasswordRecovery.controller";
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

    // ❌ DELETE THIS SECTION (This was causing the error)
    // const upload = multer({ storage: multer.memoryStorage() });
    // this.app.use(upload.any());
    // --------------------------------------------------------

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

    // Routes
    const {
      authController,
      verificationController,
      passwordRecoverController,
    } = buildControllers();
    this.app.use("/api/v1/auth", createAuthRouter(authController));
    this.app.use("/api/v1/", createVerficationRouter(verificationController));

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
