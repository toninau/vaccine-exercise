import parseFiles from './parseFiles';
import config from './config';
import mongoose from 'mongoose';
import Order from '../models/order';
import Vaccination from '../models/vaccination';
import {
  Order as IOrder,
  Vaccination as IVaccination
} from '../types';

//User is not allowed to do action [dropDatabase], has to be done manually
//Order/Vaccination.deleteMany({}) doesn't delete indexes

//Only initializes if database is empty
(async () => {
  const db = await mongoose.connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const order = await Order.findOne({});
  const vaccination = await Order.findOne({});

  if (!order && !vaccination) {
    const orders = await parseFiles<IOrder>('./resources/orders');
    const vaccinations = await parseFiles<IVaccination>('./resources/vaccinations');

    await Order.insertMany(orders);
    await Vaccination.insertMany(vaccinations);
  }

  await db.connection.close();
})().catch((err) => {
  console.error(err);
});