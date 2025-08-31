import { ObjectId } from 'mongoose';

export interface Course {
  _id?: ObjectId;
  title: string;
  subTitle?: string;
  category: string;
  price: number;
  description: string;
  content: string[];
  publication?: boolean;
  isActive?: boolean;
  status?: 'in_progress' | 'draft' | 'completed';
  modules?: ObjectId[];
  createdBy: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CourseFilter {
  title?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedCourses {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
}
