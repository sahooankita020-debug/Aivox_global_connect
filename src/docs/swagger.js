import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Aivox Global Connect API',
      version: '1.0.0',
      description: 'Backend API documentation',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: [], // later: add JSDoc paths or YAML files
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
