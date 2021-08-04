import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import ordersRouter from './controllers/orders';
//import parseFile from './utils/parseFile';
import config from './utils/config';


const main = async (): Promise<void> => {
  console.log('connecting to', config.DATABASE_URL);

  try {
    await connect(config.DATABASE_URL,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('connected to mongodb');
  } catch (error) {
    console.error('error connecting to mongodb', error.message);
    return;
  }


  //mongoose connect
  //if db empty parsefiles and populate

  //initializeDatabase() -> npm script;


  const app = express();

  /*
  const test = await parseFile();

  console.log(test[0]);
  console.log(test[test.length-1]);
  */
  app.use(cors());
  app.use('/api/orders', ordersRouter);

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });

};

main().catch(err => console.error(err));