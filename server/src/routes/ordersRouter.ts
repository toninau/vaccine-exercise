import express from 'express';
import Order from '../models/order';

const ordersRouter = express.Router();

ordersRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const order = await Order.findOne({id});
  console.log(order);
  response.status(200).json(order);
});

export default ordersRouter;