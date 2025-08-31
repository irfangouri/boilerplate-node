import {
  Request,
  Response,
  NextFunction,
} from 'express';

// import loginService from './auth-service';

import {
  getUserByIdService,
  sendOtpService,
  updatePasswordWithOtpService,
  updatePasswordByIdService,
  updateUserDetailsByIdService,
  deleteUserByIdService,
  sendVerificationCodeService,
} from './auth-service';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const data = req.body;
  const result = await getUserByIdService(data);
  res.status(result.statusCode).json(result);
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const result = await getUserByIdService(userId);
  res.status(result.statusCode).json(result);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const result = await getUserByIdService(userId);
  res.status(result.statusCode).json(result);
};

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;
  const result = await sendOtpService(email);
  res.status(result.statusCode).json(result);
};

export const updatePasswordWithOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp, newPassword } = req.body;
  const result = await updatePasswordWithOtpService(email, otp, newPassword);
  res.status(result.statusCode).json(result);
};

export const updatePasswordById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const result = await updatePasswordByIdService(id, oldPassword, newPassword);
  res.status(result.statusCode).json(result);
};

export const updateDetailsById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await updateUserDetailsByIdService(id, { name, email, phone });
  res.status(result.statusCode).json(result);
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await deleteUserByIdService(id);
  res.status(result.statusCode).json(result);
};

export const sendVerificationCode = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const result = await sendVerificationCodeService(email);
  res.status(result.statusCode).json(result);
};
