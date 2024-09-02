import mongoose from 'mongoose';

import { DatabaseConnectionError } from '../errors/database.connection.error';
import { config } from './config';

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log('connected to mongodb...');
    } catch (error) {
        console.log(error);
        throw new DatabaseConnectionError();
    }
};

export { connectDB };
