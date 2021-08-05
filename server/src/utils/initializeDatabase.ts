import parseFiles from './parseFiles';
import * as fs from 'fs/promises';
import config from './config';
import mongoose from 'mongoose';
import Order from '../models/order';
import Vaccination from '../models/vaccination';

(async () => {
  const orderFileNames = await fs.readdir('./resources/orders');
  const vaccinationFileNames = await fs.readdir('./resources/vaccinations');
  const [orders, vaccinations] = await parseFiles(orderFileNames, vaccinationFileNames);

  const db = await mongoose.connect(config.DATABASE_URL,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  await Order.insertMany(orders);
  await Vaccination.insertMany(vaccinations);
  await db.connection.close();
})().catch((err) => {
  console.error(err);
});