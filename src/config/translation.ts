import i18n from 'i18n';
import path from 'path';

// It will show response message in the configured language
// Configure i18n
const i18nConfig = {
    locales: ['en', 'hi'],
    defaultLocale: 'en', // selecetd language
    directory: path.join(__dirname, '../utils', 'translations'), // Custom directory path
};

// Initialize i18n
i18n.configure(i18nConfig);

// Export the configured i18n instance
export const i18nInstance = i18n;
