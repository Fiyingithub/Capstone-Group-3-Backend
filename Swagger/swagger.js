// swagger/swaggerConfig.js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Trackwise Expense",
      version: "1.0.0",
      description: "API documentation for Trackwise Expense",
      contact: {
        name: "Group 3",
      },
    },
    servers: [
      {
        url: "https://capstone-group-3-backend.onrender.com",
      },
    ],
    schemes: {
      http: "http",
      https: "https",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  schemas: {
    Expense: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "1",
        },
        userId: {
          type: "string",
          example: "12",
        },
        amount: {
          type: "number",
          example: 5000,
        },
        description: {
          type: "string",
          example: "Transportation to school",
        },
        category: {
          type: "string",
          example: "Transport",
        },
        paymentMethod: {
          type: "string",
          example: "Cash",
        },
        date: {
          type: "string",
          format: "date",
          example: "2025-06-11",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    },
  },
      responses: {
        UnauthorizedError: {
          description: "Authentication required",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Unauthorized",
                  },
                  message: {
                    type: "string",
                    example: "Authentication required to access this resource",
                  },
                  code: {
                    type: "integer",
                    example: 401,
                  },
                },
              },
            },
          },
        },
        ForbiddenError: {
          description: "Insufficient permissions",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Forbidden",
                  },
                  message: {
                    type: "string",
                    example: "You don't have permission to perform this action",
                  },
                  code: {
                    type: "integer",
                    example: 403,
                  },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Not Found",
                  },
                  message: {
                    type: "string",
                    example: "The requested resource was not found",
                  },
                  code: {
                    type: "integer",
                    example: 404,
                  },
                },
              },
            },
          },
        },
        ConflictError: {
          description: "Resource conflict",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Conflict",
                  },
                  message: {
                    type: "string",
                    example:
                      "Resource already exists or conflicts with existing data",
                  },
                  code: {
                    type: "integer",
                    example: 409,
                  },
                },
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Internal Server Error",
                  },
                  message: {
                    type: "string",
                    example: "An unexpected error occurred on the server",
                  },
                  code: {
                    type: "integer",
                    example: 500,
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Routes/user.route.js", "./Routes/expense.route.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
