import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from "fs";
import { Application } from "express";

export const setupSwagger = (app: Application): void => {
  // Make sure the path points to your docs folder
  const docsPath = path.resolve(__dirname, "./docs"); 
  if (!fs.existsSync(docsPath)) {
    console.error("Swagger docs folder not found:", docsPath);
    return;
  }

  // Read all YAML files in the docs folder
  const yamlFiles = fs.readdirSync(docsPath).filter((file) => file.endsWith(".yaml"));
  if (yamlFiles.length === 0) {
    console.error("No YAML files found in docs folder!");
    return;
  }

  const swaggerDocument: any = {
    openapi: "3.0.0",
    info: {
      title: "Student Nest API",
      version: "1.0.0",
      description: "API documentation for Student Nest backend.",
    },
    servers: [{ url: "http://localhost:4000/api/v1" }],
    paths: {},
    components: { schemas: {} },
  };

  yamlFiles.forEach((file) => {
    const filePath = path.join(docsPath, file);
    const doc = YAML.load(filePath);

    // Merge paths
    swaggerDocument.paths = { ...swaggerDocument.paths, ...doc.paths };

    // Merge components.schemas
    if (doc.components?.schemas) {
      swaggerDocument.components.schemas = {
        ...swaggerDocument.components.schemas,
        ...doc.components.schemas,
      };
    }

    // Merge other components (optional)
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

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger UI available at http://localhost:4000/api-docs");
};
