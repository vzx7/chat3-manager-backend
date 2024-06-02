import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { AccessUserDto, CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.getUserById);
    this.router.post(`${this.path}/createUser`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, ValidationMiddleware(UpdateUserDto, true), this.user.updateUser);
    this.router.put(`${this.path}/setActive`, AuthMiddleware, ValidationMiddleware(AccessUserDto, true), this.user.setActive);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, this.user.deleteUser);
  }
}
