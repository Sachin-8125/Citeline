import { Router } from 'express';
import {
  getCurrentUser,
  login,
  logout,
  refresh,
  register,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);  
router.post('/login', login);       
router.post('/refresh', refresh);   
router.post('/logout', requireAuth, logout);      
router.get('/me', requireAuth, getCurrentUser);   

export const authRouter = router;