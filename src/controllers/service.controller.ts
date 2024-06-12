import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AppConfig, Service } from '@/interfaces/service.interface';
import { ServiceHelper } from '@/services/service.service';
import { Item } from '@/types/Item';
import { ResponseData } from '@/types/ResponseData';

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
      const data: Service = await this.serviceHelper.create(serviceData);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(201).json(response);
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
      const data: Service = await this.serviceHelper.update(serviceData);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
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
      const data: Service = await this.serviceHelper.configureActivity(serviceData);
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
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
      const data: Array<Item> = await this.serviceHelper.getBrands();
      const response: ResponseData = {
        is: true,
        data
      };
      res.status(200).json(response);
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
    public getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const data: Array<Service> = await this.serviceHelper.getServices((req as any).user);
        const response: ResponseData = {
          is: true,
          data
        };
        res.status(200).json(response);
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
     public getService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const serviceId = Number(req.params.id);
        const data: Service & AppConfig = await this.serviceHelper.getServiceById(serviceId);
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
