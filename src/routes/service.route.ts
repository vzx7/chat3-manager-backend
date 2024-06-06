import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { CheckAuth } from '@middlewares/auth.middleware';
import { ValidateData } from '@middlewares/validation.middleware';
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
      CheckAuth,
      ValidateData(CreateServiceDto),
      this.service.createService
    );

    this.router.put(
      '/updateService',
      CheckAuth,
      ValidateData(UpdateServiceDto),
      this.service.updateService
    );

    this.router.put(
      '/configureServiceActivity',
      CheckAuth,
      ValidateData(AccessServiceDto),
      this.service.configureServiceActivity
    );

    this.router.get(
      '/getBrands',
      CheckAuth,
      this.service.getBrands
    );

    this.router.get(
      '/getServices',
      CheckAuth,
      this.service.getServices
    );
  }
}
