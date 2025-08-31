import mongoose from 'mongoose';
import logger from '../../logger';
import UserModel from './auth-model';

import {
  generateToken,
} from '../../utils/jwt';

import {
  hashPassword,
  comparePasswords,
} from '../../utils/hash';

export const registerService = async (
  data: any,
) => {
  try {
    const { name, email, phone, password } = data;

    const user = await UserModel.findOne({
      $or: [
        { email },
        { phone },
      ],
    });
    if (user) {
      return {
        success: false,
        statusCode: 409,
        message: 'User with same Email or Phone already exists.',
      };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return {
      success: true,
      statusCode: 200,
      user: newUser,
      message: 'User registered successfully',
    };
  } catch (error) {
    logger.error('There is something wrong in creating the user: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in creating new user',
    };
  }
};

export const loginService = async (
  data: {
    email: string;
    password: string;
  },
) => {
  try {
    const { email, password } = data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User with this email not found',
      };
    }

    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      return {
        success: false,
        statusCode: 403,
        message: 'Invalid Credentials, Please check your passwords',
      };
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
    });

    return {
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      token,
      user,
    };
  } catch (error) {
    logger.error('There is something wrong in logging the user: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in logging user',
    };
  }
};


export const getUserByIdService = async (
  userId: string,
) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: 'User fetched successfully',
      user,
    };
  } catch (error) {
    logger.error('There is something wrong in fetching user details: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in fetching user details',
    };
  }
};

function generateRandomCode(length = 6) {
  return Math
    .floor(100000 + Math.random() * 900000)
    .toString()
    .substring(0, length);
}

export const sendOtpService = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    const otp = generateRandomCode();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // TODO: Send OTP to email (integrate email service)
    return {
      success: true,
      statusCode: 200,
      message: 'OTP sent to email',
    };
  } catch (error) {
    logger.error('There is something wrong in sending OTP: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in sending OTP',
    };
  }
};

export const updatePasswordWithOtpService = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !user.otp || !user.otpExpires) {
      return {
        success: false,
        statusCode: 404,
        message: 'Invalid request',
      };
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return {
        success: false,
        statusCode: 400,
        message: 'Invalid or expired OTP',
      };
    }

    user.password = await hashPassword(newPassword);
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return {
      success: true,
      statusCode: 200,
      message: 'Password updated successfully',
    };
  } catch (error) {
    logger.error('There is something wrong in updating passwords: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in updating passwords',
    };
  }
};

export const updatePasswordByIdService = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    const isValid = await comparePasswords(oldPassword, user.password);
    if (!isValid) {
      return {
        success: false,
        statusCode: 403,
        message: 'Old password is incorrect',
      };
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    return {
      success: true,
      statusCode: 200,
      message: 'Password updated successfully',
    };
  } catch (error) {
    logger.error('There is something wrong in updating passwords: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in updating passwords',
    };
  }
};

export const updateUserDetailsByIdService = async (
  userId: string,
  details: {
    name?: string;
    email?: string;
    phone?: string;
  },
) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    if (details.name) user.name = details.name;
    if (details.email) user.email = details.email;
    if (details.phone) user.phone = details.phone;
    await user.save();

    return {
      success: true,
      statusCode: 200,
      message: 'User details updated successfully',
      user,
    };
  } catch (error) {
    logger.error('There is something wrong in updating user details: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in updating user details',
    };
  }
};

export const deleteUserByIdService = async (
  userId: string,
) => {
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }
    return {
      success: true,
      statusCode: 200,
      message: 'User deleted successfully',
    };
  } catch (error) {
    logger.error('There is something wrong in deleting user details: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in deleting user details',
    };
  }
};

export const sendVerificationCodeService = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: 'User not found',
      };
    }

    const code = generateRandomCode();
    const codeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    user.verificationCode = code;
    user.verificationCodeExpires = codeExpires;
    await user.save();

    // TODO: Send verification code to email (integrate email service)
    return {
      success: true,
      statusCode: 200,
      message: 'Verification code sent to email',
    };
  } catch (error) {
    logger.error('There is something wrong in deleting user details: ', error);
    return {
      success: false,
      statusCode: 500,
      message: 'Error in deleting user details',
    };
  }
};
