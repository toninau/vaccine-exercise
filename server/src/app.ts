import express from 'express';
import ordersRouter from './controllers/orders';
import cors from 'cors';

const app = express();

//mongoose connect

app.use(cors());
app.use('/api/orders', ordersRouter);

export default app;