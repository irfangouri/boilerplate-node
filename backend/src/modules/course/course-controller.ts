import {
  Request,
  Response,
  NextFunction,
} from 'express';

import courseService from './course-service';

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const result = await courseService.createCourse(req.body, userId);
  res.status(result.statusCode).json(result);
};

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filterData = req.query;
  const { tutorId } = req.params;
  const result = await courseService.getCourses(filterData, tutorId);
  res.status(result.statusCode).json(result);
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { courseId } = req.params;
  const result = await courseService.getCourseById(courseId);
  res.status(result.statusCode).json(result);
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  const { courseId } = req.params;
  const result = await courseService.updateCourse(courseId, data);
  res.status(result.statusCode).json(result);
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { courseId } = req.params;
  const result = await courseService.deleteCourse(courseId);
  res.status(result.statusCode).json(result);
};
