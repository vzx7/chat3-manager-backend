import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { AccessUserDto, CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidateData } from '@middlewares/validation.middleware';
import { CheckAdmRole, CheckAuth } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id(\\d+)`, 
      CheckAuth, 
      this.user.getUserById
    );

    this.router.post(
      `${this.path}/createUser`, 
      //CheckAuth,
      //CheckAdmRole,
      ValidateData(CreateUserDto), 
      this.user.createUser
    );

    this.router.put(
      `${this.path}/:id(\\d+)`, 
      CheckAuth,
      CheckAdmRole,
      ValidateData(UpdateUserDto, true), 
      this.user.updateUser
    );

    this.router.put(
      `${this.path}/setActive`, 
      CheckAuth, 
      CheckAdmRole,
      ValidateData(AccessUserDto, true), 
      this.user.setActive
    );
    
    this.router.delete(
      `${this.path}/:id(\\d+)`, 
      CheckAuth, 
      CheckAdmRole,
      this.user.deleteUser
    );
  }
}
