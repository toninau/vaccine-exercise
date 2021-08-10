import express from 'express';
import Order from '../models/order';
import parseQueryDate from '../utils/parseQueryDate';
import boom from '@hapi/boom';
import { DateTime } from 'luxon';
import ordersService from '../services/ordersService';

const ordersRouter = express.Router();

//How many bottles have expired on the given day (remember a bottle expires 30 days after arrival)
//How many vaccines expired before the usage -> remember to decrease used injections from the expired bottle
ordersRouter.get('/expired', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  const expDate = DateTime.utc(...date).plus({ days: -30 });

  const expiredOrderData = await ordersService.expired(new Date(expDate.toISO()));
  response.status(200).json(expiredOrderData);
});

//How many vaccines are going to expire in the next 10 days?
ordersRouter.get('/expiring10d', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  const startDate = DateTime.utc(...date).plus({ days: -30 });
  const endDate = startDate.plus({ days: 10 });

  const ordersExpiringIn10d = await ordersService
    .expiring10d(new Date(startDate.toISO()), new Date(endDate.toISO()));
  response.status(200).json(ordersExpiringIn10d);
});

//How many orders and vaccines have arrived total?
ordersRouter.get('/total', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  const endDate = DateTime.utc(...date);

  const orderTotal = await ordersService.total(new Date(endDate.toISO()));
  response.status(200).json(orderTotal);
});

//How many orders/vaccines per producer?
ordersRouter.get('/producer', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  const endDate = DateTime.utc(...date);
  const startDate = endDate.startOf('day');

  const aggregate = await ordersService
    .perProducer(new Date(startDate.toISO()), new Date(endDate.toISO()));
  response.status(200).json(aggregate);
});

ordersRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const order = await Order.findOne({ id });
  if (order) {
    return response.status(200).json(order.toJSON());
  }
  throw boom.notFound(`Order by the id of ${id} not found`);
});

export default ordersRouter;