/**
 * Данные ответа
 */
export type ResponseData = {
    /**
     * Упех или нет.
     */
    is: boolean,
    /**
     * Данные ответа
     */
    data?: object,
    /**
     * Сообщение ошибки
     */
    error?: string
}