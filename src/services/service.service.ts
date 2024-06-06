import Container, { Service } from 'typedi';
import pg from '@database';
import { Service as App } from '@/interfaces/service.interface';
import { ExternalAPIService } from './external_api.service';
import { HttpException } from '@/exceptions/httpException';
import { Item } from '@/types/Brand';

@Service()
export class ServiceHelper {
  public externalAPIService = Container.get(ExternalAPIService);
  public async create(serviceData: App): Promise<App> {
    const { domain, isSSL, userId } = serviceData;

    const active = true;
    const isConfigured = false;//await this.externalAPIService.checkApplicationByDomain(domain);
    const isiInitialization = false;

    const { rows: appData } = await pg.query(
      `
      INSERT INTO
        services(
          "domain",
          "active",
          "isInitialization",
          "isConfigured",
          "isSSL",
          "userId"
        )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING "id", "isConfigured"
      `,
      [domain, active, isiInitialization, isConfigured, isSSL, userId],
    );

    return appData[0];
  }

  public async update(serviceData: App): Promise<App> {

    const isConfigured = true;//await this.externalAPIService.configureApplication(serviceData);
    const { id } = serviceData;
    const { rows: serviceUpdateData } = await pg.query(
      `
        UPDATE
          services
        SET
          "isConfigured" = $2
        WHERE
          "id" = $1
        RETURNING "id"
      `,
      [id, isConfigured]
    );

    if (!serviceUpdateData[0]) throw new HttpException(409, "Service doesn't exist");

    return serviceUpdateData[0];
  }

  public async configureActivity(serviceData: App): Promise<App> {
    const { id, active } = serviceData;
    const { rows, rowCount } = await pg.query(
      `
      SELECT
        "isConfigured"
      FROM
      services
      WHERE
        "id" = $1
    `,
      [id],
    );

    if (!rowCount) throw new HttpException(409, "Service doesn't exist");
    else if (!rows[0].isConfigured) throw new HttpException(409, "The service was not configured! First set up the service!");

    const { rows: serviceUpdateData } = await pg.query(
      `
        UPDATE
          services
        SET
          "active" = $2
        WHERE
          "id" = $1
        RETURNING "id"
      `,
      [id, active]
    );

    return serviceUpdateData[0];
  }

  public async getBrands(): Promise<Array<App>> {
    return this.externalAPIService.getBrands();
  }

  /**
   * Получить все сервисы, которые нуждаются в конфигурации
   * @returns 
   */
  public async getServices(): Promise<Array<Item>> {
    const { rows } = await pg.query(
      `
      SELECT
        *
      FROM
        services
      WHERE
        "isConfigured" = $1
    `, [false]);

    return rows;
  }
}
