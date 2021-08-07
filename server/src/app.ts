import config from './utils/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import mongoose from 'mongoose';
import ordersRouter from './routes/ordersRouter';
import vaccinationsRouter from './routes/vaccinationsRouter';
import middleware from './utils/middleware';

mongoose.connect(config.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.error('error connecting to MongoDB', error.message);
});

const app = express();

app.use(cors());

app.use('/api/orders', ordersRouter);
app.use('/api/vaccinations', vaccinationsRouter);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

export default app;