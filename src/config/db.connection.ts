import mongoose from 'mongoose';

import { DatabaseConnectionError } from '../errors';
import { config } from './config';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('connected to mongodb...🛢');
    } catch (error) {
        console.log(error);
        throw new DatabaseConnectionError();
    }
};

export { connectDB };
