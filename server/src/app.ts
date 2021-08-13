import config from './utils/config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import mongoose from 'mongoose';
import ordersRouter from './routes/ordersRouter';
import vaccinationsRouter from './routes/vaccinationsRouter';
import middleware from './utils/middleware';
import path from 'path';

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
}

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

export default app;