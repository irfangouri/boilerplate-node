import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth';

import authRoutes from '../modules/auth/auth-routes';
import courseRoutes from '../modules/course/course-routes';

const router = Router();

// router.use(
//   '/auth',
//   authRoutes,
// );

router.use(
  '/user/:userId/course',
  authMiddleware,
  courseRoutes,
);

export default router;
