import { Router } from 'express';

import {
  login,
  register,
} from './auth-controller';
import {
  validateLogin,
  validateRegister,
} from './auth-validator';

const router = Router();

router.post(
  '/register',
  validateRegister,
  register,
)

router.post(
  '/login',
  validateLogin,
  login,
);

export default router;
