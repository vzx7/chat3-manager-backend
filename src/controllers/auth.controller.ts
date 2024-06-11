import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { ResponseData } from '@/types/ResponseData';

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
      res.cookie('refreshToken', refreshToken.key, { httpOnly: true, secure: true, maxAge: refreshToken.expiresIn * 30 });
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

      const { tokenData } = await this.auth.updateTokens(refreshToken);
      const response: ResponseData = {
        is: true,
        data: { 
          token: tokenData.token.key
        }
      };
      
      const { refreshToken: refreshTokenData } = tokenData;
      
      res.cookie('refreshToken', refreshTokenData.key, { httpOnly: true, secure: true, maxAge: refreshTokenData.expiresIn * 30 });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
