import { Router } from 'express';

import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse
} from './course-controller';

const router = Router({ mergeParams: true });

router.post(
  '/',
  createCourse,
);

router.get(
  '/',
  getCourses,
);

router.get(
  '/:courseId',
  getCourseById,
);

router.put(
  '/:courseId',
  updateCourse,
);

router.delete(
  '/:courseId',
  deleteCourse,
);

export default router;
