import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Aivox Global Connect API",
      version: "1.0.0",
      description: "Backend API documentation for Aivox Global Connect",
    },

    servers: [
      { url: "http://localhost:3000" } // LOCAL SERVER
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

    paths: {
      // ✅ AUTH ROUTES
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
                    user_type: { type: "string", default: "candidate" },
                  },
                },
              },
            },
          },
          responses: { 201: { description: "Successfully registered" } },
        },
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
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { 200: { description: "Login success" } },
        },
      },

      "/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout user",
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: "Logout successfully" } },
        },
      },

      "/auth/forgot-password": {
        post: {
          tags: ["Auth"],
          summary: "Request reset token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: { email: { type: "string" } },
                },
              },
            },
          },
          responses: { 200: { description: "Reset token created" } },
        },
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
                    new_password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: { 200: { description: "Password reset success" } },
        },
      },

      // ✅ PROFILE ROUTES
      "/api/profile": {
        get: {
          tags: ["Profile"],
          summary: "Get logged in user profile",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Return logged in user profile" },
            401: { description: "Unauthorized - Token missing or invalid" },
          },
        },
        put: {
          tags: ["Profile"],
          summary: "Update logged in user profile",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Profile updated successfully" },
            401: { description: "Unauthorized" },
          },
        },
      },

      // ✅ BUSINESS LEADS ROUTES
      "/api/business-leads": {
        post: {
          tags: ["Business Leads"],
          summary: "Create a new business lead",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["company_name"],
                  properties: {
                    company_name: { type: "string" },
                    contact_person: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    industry: { type: "string" },
                    notes: { type: "string" },
                  },
                },
                example: {
                  company_name: "Aivox Technologies",
                  contact_person: "Ankita",
                  email: "ankita@example.com",
                  phone: "9876543210",
                  industry: "IT Services",
                  notes: "Interested in automation tools",
                },
              },
            },
          },
          responses: {
            201: { description: "Lead created successfully" },
            401: { description: "Unauthorized" },
          },
        },

        get: {
          tags: ["Business Leads"],
          summary: "Get all leads created by logged in user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Return all user leads" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/api/business-leads/{id}/status": {
        patch: {
          tags: ["Business Leads"],
          summary: "Update the status of a specific business lead",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Lead ID",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["lead_status"],
                  properties: {
                    lead_status: {
                      type: "string",
                      enum: ["open", "in_progress", "closed"],
                    },
                  },
                },
                example: { lead_status: "in_progress" },
              },
            },
          },
          responses: {
            200: { description: "Lead status updated successfully" },
            400: { description: "Invalid status or bad request" },
            401: { description: "Unauthorized" },
            404: { description: "Lead not found" },
          },
        },
      },

      // ✅ CANDIDATE ROUTES
      "/api/candidates": {
        post: {
          tags: ["Candidates"],
          summary: "Create a new candidate",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["first_name", "last_name", "email"],
                  properties: {
                    first_name: { type: "string" },
                    last_name: { type: "string" },
                    email: { type: "string" },
                    skills: { type: "string" },
                    experience: { type: "number" },
                  },
                  example: {
                    first_name: "Suman",
                    last_name: "Kumar",
                    email: "suman@example.com",
                    skills: "React, Node.js, MongoDB",
                    experience: 2,
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Candidate created successfully" },
            400: { description: "Invalid request" },
            401: { description: "Unauthorized" },
          },
        },

        get: {
          tags: ["Candidates"],
          summary: "Get all candidates created by logged in user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "List of all candidates" },
            401: { description: "Unauthorized" },
          },
        },
      },

      "/api/candidates/{id}/applications": {
        post: {
          tags: ["Applications"],
          summary: "Create a new application for a candidate",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Candidate ID for which application will be created",
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["job_id", "position"],
                  properties: {
                    job_id: { type: "string" },
                    position: { type: "string" },
                    cover_letter: { type: "string" },
                    resume_link: { type: "string" },
                    source: { type: "string" },
                  },
                  example: {
                    job_id: "JOB-007",
                    position: "Frontend Developer",
                    cover_letter: "I am skilled in React and building UI apps.",
                    resume_link: "https://example.com/resume.pdf",
                    source: "LinkedIn",
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Application created successfully" },
            400: { description: "Invalid input" },
            401: { description: "Unauthorized" },
            404: { description: "Candidate not found" },
          },
        },
      },
    },
  },

  apis: [],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
}
