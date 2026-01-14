import express from "express";
import helmet from "helmet";
import "dotenv/config";
import morgan from "morgan";
import winston from "winston";
import expressWinston from "express-winston";
import debug from "debug";
import cors from "cors";
import { AppDataSource } from "./Infrastructure/Database/TypeOrm/data-source";
import { createAuthRouter } from "./Presentation/http/routes/IdentityAndAccess/Registeration.route";
import { createVerificationRouter } from "./Presentation/http/routes/IdentityAndAccess/Verfication.route";
import { PasswordRecoveryRouter } from "./Presentation/http/routes/IdentityAndAccess/PasswordRecvery.route";
import { profileRouter } from "./Presentation/http/routes/IdentityAndAccess/profile.routes";
import { auditMiddleware } from "./Presentation/http/middlewares/auditLog.middleware";
import { ApartmentSharedRouter } from "./Presentation/http/routes/shared/apartment.routes";
import { AdminIndexRouter } from "./Presentation/http/routes/admin/index.router";
import { SharedIndexRouter } from "./Presentation/http/routes/shared/index.router";
import { LandlordIndexRouter } from "./Presentation/http/routes/Landlord/index.router";
import { buildControllersBoundaryContext } from "./Presentation/http/controllers/main.controller";
import { StudentIndexRouter } from "./Presentation/http/routes/Student/index.router";
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

    // Database Connection
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
    this.app.use(express.json());

    this.app.use(auditMiddleware);

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

    const {
      authController,
      verificationController,
      passwordRecoverController,
      profileController,
      NotificationsController,
      adminUserManagementController,
      Apartment,
      adminAuditLogController,
      LeaseRequest,
      Lease,
      Payment,
    } = buildControllersBoundaryContext();

    this.app.use(
      "/api/v1/admin",
      AdminIndexRouter(
        Apartment.Admin,
        adminAuditLogController,
        adminUserManagementController
      )
    );

    this.app.use(
      "/api/v1/landlord",
      LandlordIndexRouter(
        Apartment.Landlord,
        Lease.Landlord,
        LeaseRequest.Landlord,
        Payment.Landlord
      )
    );

    this.app.use("/api/v1/student", StudentIndexRouter(Apartment.Student));

    this.app.use(
      "/api/v1/",
      SharedIndexRouter(
        Apartment.Shared,
        LeaseRequest.Shared,
        Lease.Shared,
        NotificationsController,
        Payment.Shared
      )
    );

    this.app.use("/api/v1/auth", createAuthRouter(authController));
    this.app.use("/api/v1/", createVerificationRouter(verificationController));

    // //shared
    this.app.use("/api/v1/me/", profileRouter(profileController));

    this.app.use(
      "/api/v1/password-recovery",
      PasswordRecoveryRouter(passwordRecoverController)
    );

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
