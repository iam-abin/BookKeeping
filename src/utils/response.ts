import { convertMessage } from './transformMessage';

interface ISuccessResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

const transformSuccessResponse = <T>(messageKey: string, data?: T): ISuccessResponse<T> => {
    const message = convertMessage(messageKey);

    const response: ISuccessResponse<T> = { success: true, message };

    if (data) response.data = data;
    return response;
};

export default transformSuccessResponse;
