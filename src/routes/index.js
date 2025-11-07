import { Router } from 'express';
import authRoutes from './auth.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/', healthRoutes); // GET /health

export default router;
