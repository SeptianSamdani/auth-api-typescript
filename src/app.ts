import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import routes from './routes/index';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

// Routes
app.use('/api', routes);

app.get('/', (_, res) => {
  res.json({
    message: 'Auth API - TypeScript + Express + PostgreSQL',
    version: '1.0.0',
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;