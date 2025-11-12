import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from "fs";
import { Application } from "express";

export const setupSwagger = (app: Application): void => {
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

  const swaggerDocument: any = {
    openapi: "3.0.0",
    info: {
      title: "Student Nest API",
      version: "1.0.0",
      description: "API documentation for Student Nest backend.",
    },
    servers: [{ url: "http://localhost:4000/api/v1" }],
    paths: {},
    components: { schemas: {}, parameters: {}, responses: {} },
  };

  yamlFiles.forEach((file) => {
    const filePath = path.join(docsPath, file);
    let doc: any;
    try {
      doc = YAML.load(filePath);
    } catch (err) {
      console.error(`Failed to load YAML file: ${file}`, err);
      return;
    }

    // Merge paths safely
    if (doc.paths && typeof doc.paths === "object") {
      swaggerDocument.paths = { ...swaggerDocument.paths, ...doc.paths };
    }

    // Merge components.schemas safely
    if (doc.components?.schemas && typeof doc.components.schemas === "object") {
      swaggerDocument.components.schemas = {
        ...swaggerDocument.components.schemas,
        ...doc.components.schemas,
      };
    }

    // Merge components.parameters safely
    if (doc.components?.parameters && typeof doc.components.parameters === "object") {
      swaggerDocument.components.parameters = {
        ...swaggerDocument.components.parameters,
        ...doc.components.parameters,
      };
    }

    // Merge components.responses safely
    if (doc.components?.responses && typeof doc.components.responses === "object") {
      swaggerDocument.components.responses = {
        ...swaggerDocument.components.responses,
        ...doc.components.responses,
      };
    }
  });

  // Log merged paths for debug
  if (Object.keys(swaggerDocument.paths).length === 0) {
    console.warn("Warning: No paths were loaded from YAML files!");
  } else {
    console.log("Swagger paths loaded:", Object.keys(swaggerDocument.paths));
  }

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger UI available at http://localhost:4000/api-docs");
};
