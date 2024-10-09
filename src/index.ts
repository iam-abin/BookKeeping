import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';
import { connectDB } from './config/db.connection';
import { config } from './config/config';

connectDB();

const PORT: string | number = config.PORT;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...🚀`));
