import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

interface Error {
  statusCode: number,
  message: string,
  stack?: string,
};

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // logger.error('Unhandled Error', {
  //   message: err?.message,
  //   stack: err?.stack,
  // });

  res.status(500).json({
    success: false,
    message: err?.message || 'Internal Server Error, Please try again later.',
  });
}
