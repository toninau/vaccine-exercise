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
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  //const startDate = DateTime.utc(...date);
  //const endDate = startDate.endOf('day');
  const expDateSpe = DateTime.utc(2021, 4, 12, 11, 10, 6);
  const expDate = expDateSpe.plus({ days: -30 });

  const expiredOrderData = await ordersService.expired(new Date(expDate.toISO()));
  response.status(200).json(expiredOrderData);
});

//How many vaccines are going to expire in the next 10 days?
ordersRouter.get('/expired10', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  const startDate = DateTime.utc(...date).plus({ days: -30 });
  const endDate = startDate.plus({ days: 10 });

  const expired10 = await ordersService.expired10(new Date(startDate.toISO()), new Date(endDate.toISO()));

  response.status(200).json(expired10);

});

//How many orders and vaccines have arrived total?
ordersRouter.get('/total', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  const givenDate = DateTime.utc(...date).endOf('day');

  const test = await ordersService.total(new Date(givenDate.toISO()));

  console.log(test[0]);
  response.status(200).json(test);
});

//How many orders/vaccines per producer?
ordersRouter.get('/producer', async (request, response) => {
  const date = parseQueryDate(request.query.date);
  if (!date) {
    throw boom.badRequest('date missing or invalid (yyyy-MM-dd)');
  }

  const startDate = DateTime.utc(...date);
  const endDate = startDate.endOf('day');

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