// src/server.ts
import express from "express";
import "dotenv/config";
import { AppDataSource } from "./Infrastructure/database/orm/TypeOrm/data-source";

// --- 1. Import all the CORRECT classes ---
import { UnitOfWorkRepositories } from "./Infrastructure/database/repositories/unitOfWork.repositories";
import { BcryptPasswordHasher } from "./Infrastructure/database/service/BcryptPasswordHasher";
import { StudentBuilder } from "./Application/builder/studentBuilder.build";
import { RegisterStudentUseCase } from "./Application/use-case/RegisterStudentUseCase.usecase";
import { AuthController } from "./Presentation/http/controllers/Registeration.controller";
import { createAuthRouter } from "./Presentation/http/routes/auth/Registeration.route";
import { validation } from "./Presentation/http/middlewares/validation.middleware";
import { RegisterStudetSchema } from "./Presentation/http/validation/RegisterStudentSchema.zod";
import { NodemailerService } from "./Infrastructure/services/email/NodemailerService.service";

/**
 * This class encapsulates your server setup.
 */
export class Server {
  // 1. 'app' is a property of the class
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000", 10);
  }

  /**
   * 2. 'configure' is a *method* of the class.
   * Now, 'this' refers to the Server instance.
   */
  async configure() {
    // Initialize Database
    await AppDataSource.initialize();
    console.log("✅ Database connected.");

    // Setup Middleware
    this.app.use(express.json());

    // --- 3. DEPENDENCY INJECTION WIRING ---
    const unitOfWork = new UnitOfWorkRepositories();
    const passwordService = new BcryptPasswordHasher();
    const studentBuilder = new StudentBuilder();

    // ❗️ FIX 1: Create an instance of the email service
    const emailService = new NodemailerService();

    // Inject them into the use case
    const registerStudentUseCase = new RegisterStudentUseCase(
      unitOfWork,
      passwordService,
      studentBuilder,
      emailService // ❗️ FIX 2: Pass the email service as the 4th argument
    );

    // Inject the use case into the controller
    const authController = new AuthController(registerStudentUseCase);

    // Inject the controller into the router
    const authRouter = createAuthRouter(authController);

    // 4. --- USE THE ROUTER ---
    // 'this.app' now works correctly
    this.app.use("/api/v1/auth", validation(RegisterStudetSchema), authRouter);
  }

  /**
   * Starts the server.
   */
  public async start() {
    await this.configure();
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
    });
  }
}