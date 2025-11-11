import { Router } from 'express';
import authRoutes from './auth.routes.js';
import healthRoutes from './health.routes.js';
import profileRoutes from './profile.routes.js';
import businessLeadRoutes from './businessLead.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/', healthRoutes); // GET /health
router.use('/api', profileRoutes); 
router.use('/api', businessLeadRoutes);

export default router;
