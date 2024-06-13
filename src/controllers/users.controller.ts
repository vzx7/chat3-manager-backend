import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { ResponseData } from '@/types/ResponseData';

export class UserController {
  public user = Container.get(UserService);

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const data: User = await this.user.createUser(userData);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: User[] = await this.user.findManagers();
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };



  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const data: User = await this.user.findUserById(userId);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };


  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      const data: User = await this.user.updateUser(userId, userData);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const data: User = await this.user.deleteUser(userId);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public setActive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const data: User = await this.user.setActiveUser(userData);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
