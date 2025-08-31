import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(1),
  subTitle: z.string().optional(),
  category: z.enum(['Business', 'Technology', 'UI/UX', 'Designer', 'Graphics', 'MERN Stack']),
  price: z.number().min(0),
  description: z.string().min(1),
  content: z.array(z.string().min(1)),
  publication: z.boolean().optional(),
  isActive: z.boolean().optional(),
  status: z.enum(['in_progress', 'draft', 'completed']).optional(),
  modules: z.array(z.string()).optional(),
  examination: z.string().optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  subTitle: z.string().optional(),
  category: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  description: z.string().min(1).optional(),
  content: z.array(z.string().min(1)).optional(),
  publication: z.boolean().optional(),
  isActive: z.boolean().optional(),
  status: z.enum(['in_progress', 'draft', 'completed']).optional(),
  modules: z.array(z.string()).optional(),
  examination: z.string().optional(),
});

export const validateCreateCourse = (
  data: any,
) => createCourseSchema.safeParse(data);

export const validateUpdateCourse = (
  data: any,
) => updateCourseSchema.safeParse(data);
