import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import routes from './routes/index';

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

// Routes
app.use('/api', routes);

// Root route
app.get('/', (_, res) => {
  res.send({
    message: 'Welcome to Auth API (TypeScript + Express + PostgreSQL)',
  });
});

// Error handling (simple)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
