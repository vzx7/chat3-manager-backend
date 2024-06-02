import Container, { Service } from 'typedi';
import pg from '@database';
import { Service as App } from '@/interfaces/service.interface';
import { ExternalAPIService } from './external_api.service';

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

    return serviceUpdateData[0];
  }
}
