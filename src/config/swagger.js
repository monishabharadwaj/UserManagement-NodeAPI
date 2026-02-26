const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "Professional User Management Backend with JWT & RBAC",
    },
    servers: [
      {
        url: "http://localhost:8084",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Swagger reads route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;