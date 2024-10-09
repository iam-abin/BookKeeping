interface IConfig {
    PORT: string | number;
    MONGO_URI: string;
    API_BASE_PATH: string;
    JWT_SECRET: string | undefined;
    JWT_EXPIRY_TIME: string;

    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
}

const config: Readonly<IConfig> = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGODB_CONNECTION_STRING as string,
    API_BASE_PATH: '/api',
    JWT_SECRET: process.env.PORT,
    JWT_EXPIRY_TIME: '1h',

    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY as string,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
    FIREBASE_AUTH_DOMAIN: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    FIREBASE_STORAGE_BUCKET: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID as string,
};

export { config };
