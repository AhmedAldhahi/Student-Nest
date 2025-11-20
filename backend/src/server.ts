import express from "express";
import "dotenv/config";
import { AppDataSource } from "./Infrastructure/database/orm/TypeOrm/data-source";
import { setupSwagger } from "./Presentation/documentation/swagger/swagger.config";
import { createAuthRouter } from "./Presentation/http/routes/Registeration.route";
import { buildControllers } from "./Presentation/http/controllers/index.controller";

export class Server {
  public app = express();
  public port = parseInt(process.env.PORT || "4000", 10);

  async configure() {
    await AppDataSource.initialize();
    console.log(" Database connected.");

    this.app.use(express.json());

    const { authController } = buildControllers();

    this.app.use("/api/v1/auth", createAuthRouter(authController));

    setupSwagger(this.app);
  }

  async start() {
    await this.configure();
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
      console.log(`📄 Swagger at http://localhost:${this.port}/api-docs`);
    });
  }
}
