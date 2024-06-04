import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Service } from '@/interfaces/service.interface';
import { ServiceHelper } from '@/services/service.service';
import { Item } from '@/types/Brand';

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

  /**
   * Настроить активность сервиса
   * @param req 
   * @param res 
   * @param next 
   */
    public configureServiceActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const serviceData: Service = req.body;
        const updateServiceData: Service = await this.serviceHelper.configureActivity(serviceData);
        res.status(200).json({ data: updateServiceData, message: 'set active service' });
      } catch (error) {
        next(error);
      }
    };

      /**
   * Настроить активность сервиса
   * @param req 
   * @param res 
   * @param next 
   */
      public getBrands = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const brands: Array<Item> = await this.serviceHelper.getBrands();
          res.status(200).json({ data: brands, message: 'get brands' });
        } catch (error) {
          next(error);
        }
      };
}
