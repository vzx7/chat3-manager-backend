import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Service } from '@/interfaces/service.interface';
import { ServiceHelper } from '@/services/service.service';

export class ServiceController {
  public serviceHelper = Container.get(ServiceHelper);

  public createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceData: Service = req.body;
      const createServiceData: Service = await this.serviceHelper.create(serviceData);

      res.status(201).json({ data: createServiceData, message: 'create' });
    } catch (error) {
      next(error);
    }
  };

  public updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(201).json({  });
    try {
      /* const userData: User = req.body;
      const { cookie, findUser } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' }); */
    } catch (error) {
      next(error);
    }
  };
}
