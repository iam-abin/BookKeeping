interface IConfig {
    PORT: string | number;
    MONGO_URI: string;
    API_BASE_PATH: string;
    JWT_SECRET: string | undefined;
    JWT_EXPIRY_TIME: string;
}

const config: IConfig = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGODB_CONNECTION_STRING as string,
    API_BASE_PATH: '/api',
    JWT_SECRET: process.env.PORT,
    JWT_EXPIRY_TIME: '1h',
};

export { config };
