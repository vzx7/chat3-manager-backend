import { Service } from 'typedi';
import { EXTERNAL_API_URL, EXTERNAL_API_PORT, EXTERNAL_API_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import axios from 'axios'
import { Service as App } from '@/interfaces/service.interface';
import { Item } from '@/types/Item';

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
            return data;
        } catch (error) {
            throw new HttpException(409, `Failed to check domain. Reason: ${error.message}.`);
        }
    }

    /**
     * Обновление созданного сервиса
     * @param domain 
     * @returns 
     */
    public async configureApplication(serviceData: App): Promise<boolean> {
        try {
            const { data } = await axios({
                url: `${this.URL}/configure-application`,
                method: 'get',
                headers: {
                    Authorization: EXTERNAL_API_KEY
                },
                data: serviceData
            });
            return data.is;
        } catch (error) {
            throw new HttpException(409, `Failed configure application. Reason: ${error.message}.`);
        }
    }

    /**
     * Получить словарь брендов
     * @param domain 
     * @returns 
     */
    public async getBrands(): Promise<Array<Item>> {
        try {
            const { data } = await axios({
                url: `${this.URL}/get-brands`,
                method: 'get',
                headers: {
                    Authorization: EXTERNAL_API_KEY
                }
            });
            return data.is;
        } catch (error) {
            throw new HttpException(409, `The request fell on obtaining data about brands. Reason: ${error.message}.`);
        }
    }

    /**
     * Получить конфигурацию прниложения
     * @param domain 
     * @returns 
     */
    public async getApplicationConfig(id: number): Promise<Array<Item>> {

        try {
            const { data } = await axios({
                url: `${this.URL}/get-app-configuration/${id}`,
                method: 'get',
                headers: {
                    Authorization: EXTERNAL_API_KEY
                }
            });
            return data;
        } catch (error) {
            throw new HttpException(409, `The request fell on obtaining data app configuration. Reason: ${error.message}.`);
        }
    }
}