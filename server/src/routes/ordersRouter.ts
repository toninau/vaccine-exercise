import express from 'express';
import Order from '../models/order';

const ordersRouter = express.Router();

ordersRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const order = await Order.findOne({ id });
  if (order) {
    response.status(200).json(order.toJSON());
  } else {
    response.status(404).json({ error: 'not found' });
  }
});

export default ordersRouter;