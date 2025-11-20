import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from "fs";
import { Application } from "express";

export const setupSwagger = (app: Application): void => {
  // Base URL ديناميكي
  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000/api/v1";

  // Resolve path to docs folder
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

  // Initialize Swagger document
  const swaggerDocument: any = {
    openapi: "3.0.0",
    info: {
      title: "Student Nest API",
      version: "1.0.0",
      description: "API documentation for Student Nest backend.",
    },
    servers: [{ url: API_BASE_URL }],
    paths: {},
    components: { schemas: {}, parameters: {}, responses: {} },
  };

  // Merge all YAML files into swaggerDocument
  yamlFiles.forEach((file) => {
    const filePath = path.join(docsPath, file);
    let doc: any;
    try {
      doc = YAML.load(filePath);
    } catch (err) {
      console.error(`Failed to load YAML file: ${file}`, err);
      return;
    }

    if (doc.paths && typeof doc.paths === "object") {
      swaggerDocument.paths = { ...swaggerDocument.paths, ...doc.paths };
    }
    if (doc.components?.schemas && typeof doc.components.schemas === "object") {
      swaggerDocument.components.schemas = {
        ...swaggerDocument.components.schemas,
        ...doc.components.schemas,
      };
    }
    if (doc.components?.parameters && typeof doc.components.parameters === "object") {
      swaggerDocument.components.parameters = {
        ...swaggerDocument.components.parameters,
        ...doc.components.parameters,
      };
    }
    if (doc.components?.responses && typeof doc.components.responses === "object") {
      swaggerDocument.components.responses = {
        ...swaggerDocument.components.responses,
        ...doc.components.responses,
      };
    }
  });

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`Swagger UI available at ${API_BASE_URL.replace("/api/v1", "")}/api-docs`);
};