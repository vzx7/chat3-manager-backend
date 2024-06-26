import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import { CheckAuth } from '@middlewares/auth.middleware';
import { ValidateData } from '@middlewares/validation.middleware';
import { LoginUserDto } from '@/dtos/users.dto';

export class AuthRoute implements Routes {
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/login', 
      ValidateData(LoginUserDto), 
      this.auth.logIn
    );
    
    this.router.get(
      '/logout', 
      CheckAuth, 
      this.auth.logOut
    );
    
    this.router.get(
      '/refreshToken', 
      this.auth.refreshToken
    );
  }
}
