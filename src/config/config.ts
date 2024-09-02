const config = {
    port: process.env.PORT || 4000,
    mongoURI: process.env.MONGODB_CONNECTION_STRING as string,
};

export { config };
