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
import { NodemailerService } from "./Infrastructure/services/email/NodemailerService.service";
import { RegisterLandloardUseCase } from "./Application/use-case/RegisterLandloardUseCase.usecase";
import { LandloardBuilder } from "./Application/builder/landloardBuilder.build";
import { VerficationController } from "./Presentation/http/controllers/Verfication.controller";
import { ResendOtpUseCase } from "./Application/use-case/ResendOtpUseCase.usecase";
import { createVerficationRouter } from "./Presentation/http/routes/auth/Verfication.route";


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
    const landloardBuilder = new LandloardBuilder();

    const emailService = new NodemailerService();

    // Inject them into the use case
    const registerStudentUseCase = new RegisterStudentUseCase(
      unitOfWork,
      passwordService,
      studentBuilder,
      emailService 
    );

    const registerLandloardUseCase = new RegisterLandloardUseCase(
      unitOfWork,
      passwordService,
      landloardBuilder,
      emailService
    ); 

    const resendOtpUseCase = new ResendOtpUseCase(emailService,unitOfWork);
    

    // Inject the use case into the controller
    const authController = new AuthController(
      registerStudentUseCase,
      registerLandloardUseCase
    ); 

    const verficationController = new VerficationController(resendOtpUseCase);




    // Inject the controller into the router
    const authRouter = createAuthRouter(authController);
    const verificationRouter = createVerficationRouter(verficationController);

    // 4. --- USE THE ROUTER ---
    // 'this.app' now works correctly
    this.app.use("/api/v1/auth",  authRouter);
    this.app.use("/api/v1/verification/",verificationRouter);
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
