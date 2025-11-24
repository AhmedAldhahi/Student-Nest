import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from "fs";
import { Application } from "express";

export const setupSwagger = (app: Application): void => {
  // Set base URL for API
  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000/api/v1";

  // Resolve the path to the docs folder
  const docsPath = path.resolve(__dirname, "./docs");

  // Check if docs folder exists
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

  console.log(`Found ${yamlFiles.length} YAML file(s) to process.`);

  // Initial swagger document structure
  const swaggerDocument: any = {
    openapi: "3.0.0",
    info: {
      title: "Student Nest API",
      version: "1.0.0",
      description: "API documentation for Student Nest backend.",
    },
    servers: [{ url: API_BASE_URL }],
    tags: [],
    paths: {},
    components: { schemas: {}, parameters: {}, responses: {} },
  };

  // Merge all YAML files into the swagger document
  yamlFiles.forEach((file) => {
    const filePath = path.join(docsPath, file);
    console.log(`Processing YAML file: ${filePath}`);
    try {
      const doc = YAML.load(filePath);

      if (doc.paths) {
        swaggerDocument.paths = { ...swaggerDocument.paths, ...doc.paths };
        console.log(`Merged paths from ${file}`);
      }

      if (doc.tags) {
        swaggerDocument.tags = [...swaggerDocument.tags, ...doc.tags];
        console.log(`Merged tags from ${file}`);
      }

      if (doc.components?.schemas) {
        swaggerDocument.components.schemas = {
          ...swaggerDocument.components.schemas,
          ...doc.components.schemas,
        };
        console.log(`Merged schemas from ${file}`);
      }

      if (doc.components?.parameters) {
        swaggerDocument.components.parameters = {
          ...swaggerDocument.components.parameters,
          ...doc.components.parameters,
        };
        console.log(`Merged parameters from ${file}`);
      }

      if (doc.components?.responses) {
        swaggerDocument.components.responses = {
          ...swaggerDocument.components.responses,
          ...doc.components.responses,
        };
        console.log(`Merged responses from ${file}`);
      }
    } catch (err) {
      console.error(`Failed to load or parse YAML file: ${filePath}`, err);
    }
  });

  //console.log("Final Swagger Document:", JSON.stringify(swaggerDocument, null, 2));

  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  console.log(`Swagger UI is available at http://localhost:4000/api-docs`);
};
