import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Service } from '@/interfaces/service.interface';
import { ServiceHelper } from '@/services/service.service';

export class ServiceController {
  public serviceHelper = Container.get(ServiceHelper);
  /**
   * Создание сервиса
   * @param req 
   * @param res 
   * @param next 
   */
  public createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceData: Service = req.body;
      const createServiceData: Service = await this.serviceHelper.create(serviceData);

      res.status(201).json({ data: createServiceData, message: 'create' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Обнавление сервиса
   * @param req 
   * @param res 
   * @param next 
   */
  public updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceData: Service = req.body;
      const updateServiceData: Service = await this.serviceHelper.update(serviceData);
      res.status(200).json({ data: updateServiceData, message: 'update service' });
    } catch (error) {
      next(error);
    }
  };
}
