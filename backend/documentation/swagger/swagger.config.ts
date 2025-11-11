import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from "fs";
import { Application } from "express";

export const setupSwagger = (app: Application): void => {
  const docsPath = path.resolve(__dirname, "../../documentation/swagger/docs");
  const yamlFiles = fs.readdirSync(docsPath).filter((file) => file.endsWith(".yaml"));

  const swaggerDocument: any = {
    openapi: "3.0.0",
    info: {
      title: "Student Nest API",
      version: "1.0.0",
      description: "API documentation for Student Nest backend.",
    },
    servers: [{ url: "http://localhost:4000/api/v1" }],
    paths: {},
    components: { schemas: {} }, // Ensure schemas object exists
  };

  yamlFiles.forEach((file) => {
    const doc = YAML.load(path.join(docsPath, file));

    // Merge paths
    swaggerDocument.paths = { ...swaggerDocument.paths, ...doc.paths };

    // Merge components.schemas safely
    if (doc.components?.schemas) {
      swaggerDocument.components.schemas = {
        ...swaggerDocument.components.schemas,
        ...doc.components.schemas,
      };
    }

    // Optionally merge other components (parameters, responses, etc.)
    if (doc.components?.parameters) {
      swaggerDocument.components.parameters = {
        ...swaggerDocument.components.parameters,
        ...doc.components.parameters,
      };
    }
    if (doc.components?.responses) {
      swaggerDocument.components.responses = {
        ...swaggerDocument.components.responses,
        ...doc.components.responses,
      };
    }
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger UI available at /api-docs");
};
