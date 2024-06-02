import Container, { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
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
        /* const { email, password } = userData;
    
        const { rows, rowCount } = await pg.query(
          `
          SELECT
            "email",
            "password"
          FROM
            users
          WHERE
            "email" = $1
        `,
          [email],
        );
        if (!rowCount) throw new HttpException(409, `This email ${email} was not found`);
    
        const isPasswordMatching: boolean = await compare(password, rows[0].password);
        if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    
        const tokenData = createToken(rows[0]);
        const cookie = createCookie(tokenData);
        return { cookie, findUser: rows[0] };
      }
    
      public async logout(userData: User): Promise<User> {
        const { email, password } = userData;
    
        const { rows, rowCount } = await pg.query(
          `
        SELECT
            "email",
            "password"
          FROM
            users
          WHERE
            "email" = $1
          AND
            "password" = $2
        `,
          [email, password],
        );
        if (!rowCount) throw new HttpException(409, "User doesn't exist");
    
        return rows[0]; */
        return serviceData;
    }
}
