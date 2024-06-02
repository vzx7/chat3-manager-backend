import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateServiceDto, UpdateServiceDto } from '@/dtos/service.dto';
import { ServiceController } from '@/controllers/service.controller';

export class ServiceRoute implements Routes {
  public router = Router();
  public service = new ServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/createService', AuthMiddleware, ValidationMiddleware(CreateServiceDto), this.service.createService);
    this.router.post('/updateService/:id(\\d+)', AuthMiddleware, ValidationMiddleware(UpdateServiceDto), this.service.updateService);
  }
}
