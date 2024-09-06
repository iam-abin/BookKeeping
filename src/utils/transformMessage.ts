import { i18nInstance } from '../config/translation';

export const convertMessage = (message: string): string => {
    // It convert the english message to configured language.
    // eg:- If configured for 'hi' means hindi, then it will give hindi message based on
    //  the key value pairs in ./utils/translations/hi.json file.
    return i18nInstance.__(message);
};
