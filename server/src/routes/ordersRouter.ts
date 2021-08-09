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

  const startDate = DateTime.utc(...date);
  const endDate = startDate.endOf('day');
  const expDate = startDate.plus({ days: -30 });

  //expired bottles on given day
  const ordersExp = await Order.find({
    arrived: {
      $lt: new Date(expDate.toISO())
    }
  });

  const ordersExpTotal = ordersExp.reduce((accumulator, current) => {
    return accumulator + current.injections;
  }, 0);

  //how many vaccines are going to expire in the next 10 days


  //how many orders and vaccines
  const orders = await Order.find({
    arrived: {
      $gte: new Date(startDate.toISO()),
      $lte: new Date(endDate.toISO()),
    }
  });

  const oTotal = orders.length;
  const vTotal = orders.reduce((accumulator, current) => {
    return accumulator + current.injections;
  }, 0);

  //How many orders/vaccines per producer?
  const producers = [...new Set(orders.map(order => order.vaccine))];

  const perProducer = producers.map((producer) => {
    const filtered = orders.filter(o => o.vaccine === producer);
    const test = filtered.reduce((a, b) => {
      return a + b.injections;
    }, 0);
    return {
      name: producer,
      orders: filtered.length,
      vaccines: test,
    };
  });

  const obj = {
    orders: oTotal,
    vaccines: vTotal,
    producers: perProducer,
    expired: {
      orders: ordersExp.length,
      vaccines: ordersExpTotal
    }
  };

  response.status(200).json(obj);
});

export default ordersRouter;