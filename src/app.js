import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { setupSwagger } from './docs/swagger.js';

//  import rate limiter middleware
import { apiLimiter } from './middlewares/rateLimiter.js';

const app = express();

// Core middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Apply rate limiting globally (before routes)
app.use(apiLimiter);

// Setup Swagger Docs
setupSwagger(app);

// Routes
app.use('/', routes);

// 404 + Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
