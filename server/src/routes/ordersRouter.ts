import express from 'express';
import Order from '../models/order';
import boom from '@hapi/boom';

const ordersRouter = express.Router();

ordersRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id;
  const order = await Order.findOne({ id });
  if (order) {
    return response.status(200).json(order.toJSON());
  }
  return next(boom.notFound(`Resource by the id of ${id} not found`));
});

export default ordersRouter;