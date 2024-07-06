import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import sendResponse from './app/utils/sendResponse';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'The API is working successfully',
    data: 'Everything is working fine here till now',
  });
};

app.get('/', test);

app.use(globalErrorHandler);

// Not found
app.use(notFound);

export default app;
