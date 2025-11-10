import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { requestReset, resetPassword } from '../controllers/password.controller.js';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';

import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout (protected)
router.post('/logout', requireAuth, logoutUser);

// Password forget routes
router.post('/forgot-password', requestReset);

// Reset password
router.post('/reset-password', resetPassword);

// Profile routes
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);

export default router;

