import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';

const router = Router();

router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);

export default router;
