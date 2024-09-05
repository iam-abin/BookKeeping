import { i18nInstance } from '../config/translation';

interface IResponse {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}

const transformResponse = (
    success: boolean,
    messageKey: string,
    data?: any,
    // error?: Error | unknown,
): IResponse => {
    const message = i18nInstance.__(messageKey);

    const response: IResponse = {
        success,
        message,
    };

    if (success && data) {
        response.data = data;
    }

    return response;
};

export default transformResponse;
