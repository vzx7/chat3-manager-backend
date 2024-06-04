import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      
      const { tokenData: {  token, refreshToken  }, findUser } = await this.auth.login(userData);

      res.cookie('refreshToken', refreshToken.key, { maxAge: refreshToken.expiresIn, httpOnly: true });
      res.status(200).json({ 
        data: 
        { 
          message: 'login', 
          token: token.key, 
          user: { role: findUser.role, fio: findUser.fio, id: findUser.id } 
        }
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const tokenData: { id: number } = await this.auth.logout(userData);
      res.cookie('refreshToken', null, { maxAge: 0});
      res.status(200).json({ data: { message: 'logout', is: !!tokenData?.id }});
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const { tokenData: {  token, refreshToken  }, findUser } = await this.auth.updateTokens(userData);

      res.cookie('refreshToken', refreshToken.key, { maxAge: refreshToken.expiresIn, httpOnly: true });
      res.status(200).json({ 
        data: 
        { 
          message: 'login', 
          token: token.key, 
          user: { role: findUser.role, fio: findUser.fio, id: findUser.id } 
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
