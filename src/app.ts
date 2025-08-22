import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './lib/prisma'; 
import aiRouter from './routes/ai.routes';

import ApiError from './utils/apiError';

require('dotenv').config();

const app = express();

app.set('trust proxy', 1);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());  


// Routes
app.use("/api", aiRouter);
// 404 handler
app.use((req, _, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
