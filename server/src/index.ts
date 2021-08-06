import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import ordersRouter from './routes/ordersRouter';
import vaccinationsRouter from './routes/vaccinationsRouter';
import config from './utils/config';

const main = async (): Promise<void> => {
  await connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const app = express();

  app.use(cors());
  app.use('/api/orders', ordersRouter);
  app.use('/api/vaccinations', vaccinationsRouter);

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

main().catch(err => console.error(err));