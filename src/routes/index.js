import { Router } from 'express';
import authRoutes from './auth.routes.js';
import healthRoutes from './health.routes.js';
import profileRoutes from './profile.routes.js';
import businessLeadRoutes from './businessLead.routes.js';
import candidateRoutes from "./candidate.routes.js";
import { addApplication } from '../controllers/candidate.controller.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/', healthRoutes); // GET /health
router.use('/api', profileRoutes); 
router.use('/api', businessLeadRoutes);
router.use("/api", candidateRoutes);
router.use("/api", addApplication);

export default router;
