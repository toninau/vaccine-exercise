import parseFiles from './parseFiles';
import * as fs from 'fs/promises';
import config from './config';
import { connect } from 'mongoose';
import Order from '../models/order';


(async () => {

  const orderFileNames = await fs.readdir('./resources/orders');
  const vaccinationFileNames = await fs.readdir('./resources/vaccinations');
  console.log(orderFileNames, vaccinationFileNames);


  const [orders, vaccinations] = await parseFiles(orderFileNames, vaccinationFileNames);
  console.log(orders[0]);
  console.log(vaccinations[0]);


  //mongoose connect
  console.log('connecting to', config.DATABASE_URL);

  try {
    await connect(config.DATABASE_URL,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to mongodb');
  } catch (error) {
    console.error('error connecting to mongodb', error.message);
    //throw error.message
    return;
  }

  void Order.insertMany(orders);


  //insert many







})().catch((err) => {
  console.error(err);
});
