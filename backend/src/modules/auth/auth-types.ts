import { ObjectId } from "mongoose";


export interface Auth {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  courses: ObjectId[];
  otp?: string | null;
  otpExpires?: Date | null;
  verificationCode?: string | null;
  verificationCodeExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}


export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}


export interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  user?: Auth;
}


export interface LoginRequest {
  email: string;
  password: string;
}


export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  user?: Auth;
}

export interface GetUserByIdResponse {
  success: boolean;
  statusCode: number;
  message: string;
  user?: Auth;
}

export interface SendOtpRequest {
  email: string;
}

export interface SendOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface UpdatePasswordWithOtpRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface UpdatePasswordWithOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface UpdatePasswordByIdRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface UpdatePasswordByIdResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface UpdateUserDetailsRequest {
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface UpdateUserDetailsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  user?: Auth;
}

export interface DeleteUserByIdResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface SendVerificationCodeRequest {
  email: string;
}

export interface SendVerificationCodeResponse {
  success: boolean;
  statusCode: number;
  message: string;
}
