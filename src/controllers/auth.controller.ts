import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { ResponseData } from '@/types/ResponseData';
import { REFRESH_TOKEN_COOKIES_EXPIRES } from '@config';

export class AuthController {
  public auth = Container.get(AuthService);

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      
      const { tokenData, findUser } = await this.auth.login(userData);
      delete findUser.password;
      const response: ResponseData = {
        is: true,
        data: { 
          tokens: tokenData, 
          user: findUser
        }
      };
      
      const { refreshToken } = tokenData;

      const  date = new Date();
      const expires = new Date(date.setDate(date.getDate() + Number(REFRESH_TOKEN_COOKIES_EXPIRES)));

      res.cookie('refreshToken', refreshToken.key, { httpOnly: true, secure: true, expires });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      await this.auth.logout(userData);
      const response: ResponseData = {
        is: true,
        data: { }
      };

      res.cookie('refreshToken', null, { maxAge: 0});
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.cookies;
      const { token } = await this.auth.updateToken(refreshToken);
      const response: ResponseData = {
        is: true,
        data: { token: token.key }
      };
      
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
