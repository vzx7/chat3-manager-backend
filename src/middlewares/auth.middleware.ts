import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { Role } from '@/types/Role';

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
 * Проверка jwt токена
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const CheckAuth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = getToken(req);
    console.log(verify(token, TOKEN_SECRET_KEY), 9999)
    if (token) {
      const { id } = (verify(token, TOKEN_SECRET_KEY)) as DataStoredInToken;

      const { rows, rowCount } = await pg.query(`
        SELECT
        "id",
        "email",
        "password"
        "role"
        FROM
          users
        WHERE
          "id" = $1
      `, [id]);

      if (rowCount) {
        req.user = rows[0];
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
};

/**
 * Проверка роли, если запрос несанкционированный, нужно заблокировать пользователя и сделать logout
 * @param req 
 * @param res 
 * @param next 
 */
export const CheckAdmRole = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user.role !== Role.admin) {
    await pg.query(
      `
      UPDATE
        users
      SET
        "active" = $2
      WHERE
        "id" = $1
    `,
      [req.user.id, false],
    );
    await pg.query(
      `
      DELETE
      FROM
        tokens
      WHERE
        "userId" = $1
      RETURNING "id"
      `,
      [req.user.id]
    );
    res.cookie('refreshToken', null, { maxAge: 0});
  }
}

