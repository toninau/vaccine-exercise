import parseFiles from './parseFiles';
import config from './config';
import mongoose from 'mongoose';
import Order from '../models/order';
import Vaccination from '../models/vaccination';
import {
  Order as IOrder,
  Vaccination as IVaccination
} from '../types';

(async () => {
  const orders = await parseFiles<IOrder>('./resources/orders');
  const vaccinations = await parseFiles<IVaccination>('./resources/vaccinations');

  const db = await mongoose.connect(config.DATABASE_URL, {
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