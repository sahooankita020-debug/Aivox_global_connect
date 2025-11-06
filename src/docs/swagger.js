import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Aivox Global Connect API',
      version: '1.0.0',
      description: 'Backend API documentation for Aivox Global Connect',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths: {
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["first_name", "last_name", "email", "password"],
                  properties: {
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                    user_type: { type: "string", default: "candidate" }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: "Successfully registered" }
          }
        }
      },

      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login user & get JWT token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" }
                  }
                }
              }
            }
          },
          responses: { 200: { description: "Login success" } }
        }
      },

      "/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout user",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Logout successfully" } }
        }
      },

      "/auth/forgot-password": {
        post: {
          tags: ["Auth"],
          summary: "Request reset token",
          responses: { 200: { description: "Reset token created" } }
        }
      },

      "/auth/reset-password": {
        post: {
          tags: ["Auth"],
          summary: "Reset password using token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["token", "new_password"],
                  properties: {
                    token: { type: "string" },
                    new_password: { type: "string" }
                  }
                }
              }
            }
          },
          responses: { 200: { description: "Password reset success" } }
        }
      }
    }
  },
  apis: []
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}

