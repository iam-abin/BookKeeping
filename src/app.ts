import 'express-async-errors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { rateLimiter } from './middlewares';
import { config } from './config/config';
import borrowRoutes from './routes/borrow';
import userRoutes from './routes/user';
import bookRoutes from './routes/book';
import libraryRoutes from './routes/library';

const app: Application = express();

const isProductionENV: boolean = process.env.NODE_ENV === 'production';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(helmet());
app.use(
    cors({
        origin: '*',
        methods: "GET,POST,PUT,PATCH,DELETE",
    }),
);
app.use(rateLimiter);

// Http logger middlewares
if (!isProductionENV) app.use(morgan('dev'));

// Routes
app.use(`${config.API_BASE_PATH}/`, borrowRoutes);
app.use(`${config.API_BASE_PATH}/users`, userRoutes);
app.use(`${config.API_BASE_PATH}/books`, bookRoutes);
app.use(`${config.API_BASE_PATH}/libraries`, libraryRoutes);

app.all('*', (req: Request, res: Response) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
