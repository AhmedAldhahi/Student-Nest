"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const setupSwagger = (app) => {
    const docsPath = path_1.default.resolve(__dirname, "./docs");
    if (!fs_1.default.existsSync(docsPath)) {
        console.error("Swagger docs folder not found:", docsPath);
        return;
    }
    const yamlFiles = fs_1.default.readdirSync(docsPath).filter((file) => file.endsWith(".yaml"));
    if (yamlFiles.length === 0) {
        console.error("No YAML files found in docs folder!");
        return;
    }
    const swaggerDocument = {
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
        const filePath = path_1.default.join(docsPath, file);
        let doc;
        try {
            doc = yamljs_1.default.load(filePath);
        }
        catch (err) {
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
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    console.log("Swagger UI available at http://localhost:4000/api-docs");
};
exports.setupSwagger = setupSwagger;
