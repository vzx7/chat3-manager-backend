import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET_KEY, TOKEN_SECRET_KEY } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

/**
 * Получить токен
 * @param req 
 * @returns 
 */
const getToken = (req: RequestWithUser): string => {
  const coockie = req.cookies['Authorization'];
  if (coockie) return coockie;
  
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

/**
 * Проверка токена
 * @param req 
 * @param res 
 * @param next 
 * @param secret 
 */
const _checkToken = async (req: RequestWithUser, res: Response, next: NextFunction, secret: string) => {
  try {
    const token = getToken(req);
    console.log(token)

    if (token) {
      const { id } = (verify(token, secret)) as DataStoredInToken;
      const { rows, rowCount } = await pg.query(`
        SELECT
        "id",
        "email",
        "password"
        FROM
          users
        WHERE
          "id" = $1
      `, [id]);

      if (rowCount) {
        req.user = rows[0];
        console.log(req.user)
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
}

/**
 * Проверка jwt токена
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const CheckAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => _checkToken(req, res, next, TOKEN_SECRET_KEY);

/**
 * Проверка jwt refresh токена
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const CheckRefreshToken = async (req: RequestWithUser, res: Response, next: NextFunction) => _checkToken(req, res, next, REFRESH_TOKEN_SECRET_KEY);

