import { i18nInstance } from '../config/translation';

interface ISuccessResponse {
    success: boolean;
    message: string;
    data?: any;
}

const transformSuccessResponse = (messageKey: string, data?: any): ISuccessResponse => {
    const message = i18nInstance.__(messageKey);

    const response: ISuccessResponse = {
        success: true,
        message,
    };

    if (data) {
        response.data = data;
    }

    return response;
};

export default transformSuccessResponse;
