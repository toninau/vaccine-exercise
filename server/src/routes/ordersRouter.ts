import express from 'express';
import Order from '../models/order';
import parseQueryDate from '../utils/parseQueryDate';
import boom from '@hapi/boom';
import { DateTime } from 'luxon';

const ordersRouter = express.Router();

ordersRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const order = await Order.findOne({ id });
  if (order) {
    return response.status(200).json(order.toJSON());
  }
  throw boom.notFound(`Order by the id of ${id} not found`);
});

ordersRouter.get('/', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  const start = DateTime.utc(...date);
  const end = start.endOf('day');

  const orders = await Order.find({ arrived: {
    $gte: new Date(start.toISO()),
    $lte: new Date(end.toISO()),
  }}).sort({ arrived: 1 });
  //sort to be removed


  console.log(orders[0], orders[orders.length-1]);
  console.log(orders.length);

  const oTotal = orders.length;
  const vTotal = orders.reduce((accumulator, current) => {
    return accumulator + current.injections;
  }, 0);
  //orders/vaccines per producer
  //expired orders start - 30 days -> Order.find({...}).count()
  /*
  {
    total
    producer: [
      {
        name:
        order:
        vaccines:
      }
    ]
  }
  */

  //object

  response.status(200).json({ orders: oTotal, vaccines: vTotal });
});

export default ordersRouter;