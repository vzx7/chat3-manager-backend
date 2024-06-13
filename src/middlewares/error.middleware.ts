import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { logger } from '@utils/logger';
import { ResponseData } from '@/types/ResponseData';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    const response: ResponseData = {
      is: false,
      error: message
    };
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};
