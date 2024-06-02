import { Service } from 'typedi';
import { EXTERNAL_API_URL, EXTERNAL_API_PORT, EXTERNAL_API_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import axios from 'axios'

/**
 * Сервис для работы с внешим API
 */
@Service()
export class ExternalAPIService {
    private URL: string;

    constructor() {
        this.URL = `${EXTERNAL_API_URL}:${EXTERNAL_API_PORT}`;
    }

    /**
     * Существует ли приложения для созданного домена
     * Дело в том, что одно приложение может быть привязано к разным доменам и может случится, 
     * что после добавления домена приложение уже было ранее создано.
     * @param domain 
     * @returns 
     */
    public async checkApplicationByDomain(domain: string): Promise<boolean> {
        try {
            const { data } = await axios({
                url: `${this.URL}/check-application-by-domain`,
                method: 'get',
                headers: {
                    Authorization: EXTERNAL_API_KEY
                },
                data: { domain }
              });
              return data.is;
        } catch (error) {
            throw new HttpException(409, `Failed to check domain. Reason: ${error.message}.`);
        }
    }
}