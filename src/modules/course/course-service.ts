import mongoose from 'mongoose';
import CourseModel from './course-model';

import {
  CourseFilter,
  PaginatedCourses,
} from './course-types';

import {
  validateCreateCourse,
  validateUpdateCourse,
} from './course-validator';
import logger from '../../logger';

const createCourse = async (
  data: any,
  userId: string,
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        success: false,
        statusCode: 400,
        message: 'Invalid User ID',
      };
    }

    const parsed = validateCreateCourse(data);
    if (!parsed.success) {
      return {
        success: false,
        statusCode: 400,
        message: parsed?.error,
      };
    }

    // Check for duplicate title, title should be unique
    const exists = await CourseModel.findOne({ title: parsed.data.title });
    if (exists) {
      return {
        success: false,
        statusCode: 409,
        message: 'Course title already exists',
      };
    }

    const course = await CourseModel.create({
      ...parsed.data,
      createdBy: userId,
    });
    return {
      success: true,
      statusCode: 201,
      course,
      message: 'Course Created Successfully'
    };
  } catch (error) {
    logger.error('There is something wrong in creating the course: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in creating new course',
    };
  }
};

const getCourses = async (
  filter: CourseFilter,
  tutorId?: string,
) => {
  const {
    title = '',
    page = 1,
    limit = 10,
  } = filter;

  const query: any = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }

  if (tutorId) {
    query.createdBy = tutorId;
  }

  const total = await CourseModel.countDocuments(query);
  const courses = await CourseModel.find(query)
    .populate('modules')
    .populate('createdBy')
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    success: true,
    statusCode: 200,
    courses,
    total,
    page,
    limit,
  };
};

const getCourseById = async (
  id: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid course ID',
    };
  }

  const course = await CourseModel.findById(id)
                  .populate('modules')
                  .populate('createdBy');

  if (!course) {
    return {
      success: false,
      statusCode: 404,
      message: 'Course not found',
    };
  }

  return {
    success: true,
    statusCode: 200,
    course,
  };
};

const updateCourse = async (
  id: string,
  data: any,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid course ID',
    };
  }

  const parsed = validateUpdateCourse(data);
  if (!parsed.success) {
    return {
      success: false,
      statusCode: 400,
      message: parsed.error,
    };
  }

  const course = await CourseModel.findByIdAndUpdate(
                  id,
                  parsed.data,
                  { new: true },
                );

  if (!course) {
    return {
      success: false,
      statusCode: 404,
      message: 'Course not found',
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Course Updated Successfully',
    course,
  };
};

const deleteCourse = async (
  id: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return {
      success: false,
      statusCode: 400,
      message: 'Invalid course ID',
    };
  }

  const course = await CourseModel.findByIdAndDelete(id);
  if (!course) {
    return {
      success: false,
      statusCode: 404,
      message: 'Course not found',
    };
  }

  return {
    success: true,
    statusCode: 204,
    message: 'Course Deleted Successfully',
  };
};

export default {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
