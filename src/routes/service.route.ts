import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AccessServiceDto, CreateServiceDto, UpdateServiceDto } from '@/dtos/service.dto';
import { ServiceController } from '@/controllers/service.controller';

export class ServiceRoute implements Routes {
  public router = Router();
  public service = new ServiceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/createService',
      AuthMiddleware,
      ValidationMiddleware(CreateServiceDto),
      this.service.createService
    );

    this.router.put(
      '/updateService',
      AuthMiddleware,
      ValidationMiddleware(UpdateServiceDto),
      this.service.updateService
    );

    this.router.put(
      '/configureServiceActivity',
      AuthMiddleware,
      ValidationMiddleware(AccessServiceDto),
      this.service.configureServiceActivity
    );

    this.router.get(
      '/getBrands',
      AuthMiddleware,
      this.service.getBrands
    );
  }
}
