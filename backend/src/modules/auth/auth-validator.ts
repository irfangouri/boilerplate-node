import {
  Request,
  Response,
  NextFunction,
} from 'express';


export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return next({
      statusCode: 400,
      message: 'Name, Email, Phone, and Password are required',
    });
  }
  next();
};


export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      statusCode: 400,
      message: 'Email & Password are required',
    });
  }
  next();
};

export const validateGetUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id) {
    return next({
      statusCode: 400,
      message: 'User ID is required',
    });
  }
  next();
};

export const validateSendOtp = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.email) {
    return next({
      statusCode: 400,
      message: 'Email is required',
    });
  }
  next();
};

export const validateUpdatePasswordWithOtp = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return next({
      statusCode: 400,
      message: 'Email, OTP, and new password are required',
    });
  }
  next();
};

export const validateUpdatePasswordById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { oldPassword, newPassword } = req.body;
  if (!req.params.id || !oldPassword || !newPassword) {
    return next({
      statusCode: 400,
      message: 'User ID, old password, and new password are required',
    });
  }
  next();
};

export const validateUpdateDetailsById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id) {
    return next({
      statusCode: 400,
      message: 'User ID is required',
    });
  }
  next();
};

export const validateDeleteUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.id) {
    return next({
      statusCode: 400,
      message: 'User ID is required',
    });
  }
  next();
};

export const validateSendVerificationCode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.email) {
    return next({
      statusCode: 400,
      message: 'Email is required',
    });
  }
  next();
};
