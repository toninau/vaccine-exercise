import mongoose from 'mongoose';
import supertest from 'supertest';

import { Order as IOrder, Vaccination as IVaccination } from '../types';
import Order from '../models/order';
import Vaccination from '../models/vaccination';
import parseFiles from '../utils/parseFiles';
import app from '../app';
import { OrderToMatch, VaccinationToMatch, ExpiredToMatch } from './test_helper';

const api = supertest(app);

let orders: IOrder[];
let vaccinations: IVaccination[];

beforeAll(async () => {
  orders = await parseFiles<IOrder>('./src/tests/resources/orders');
  vaccinations = await parseFiles<IVaccination>('./src/tests/resources/vaccinations');

  await Order.insertMany(orders);
  await Vaccination.insertMany(vaccinations);
});

describe('HTTP GET /api/orders/:id', () => {
  test('order is returned as json', async () => {
    const response = await api
      .get('/api/orders/6da3a8cf-c923-4c77-8f80-c69c935fe1df')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(OrderToMatch);
  });
  test('order by the given id is not found', async () => {
    const id = 'cc915414-dab3-4fb6-8d43-360c4b9b8941';
    const response = await api
      .get(`/api/orders/${id}`)
      .expect(404)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual({ message: `Order by the id of ${id} not found` });
  });
});

describe('HTTP GET /api/orders/producer?date', () => {
  test('correct amount of producers is returned', async () => {
    const response = await api
      .get('/api/orders/producer?date=2021-01-11T23:59:59')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(1);
  });
  test('returns empty array when 0 orders have arrived during the day', async () => {
    const response = await api
      .get('/api/orders/producer?date=2021-01-11')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(0);
  });
});

describe('HTTP GET /api/orders/total?date', () => {
  test('all orders have arrived total to this date', async () => {
    const response = await api
      .get('/api/orders/total?date=2021-05-11T23:59:59')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    //Antiqua 10 * 4 + Zerpfy 10 * 5
    expect(response.body).toEqual({ bottles: 20, injectionsInBottles: 90 });
  });
  test('0 orders have arrived total to this date', async () => {
    const response = await api
      .get('/api/orders/total?date=2020-12-11T23:59:59')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual({ bottles: 0, injectionsInBottles: 0 });
  });
});

describe('HTTP GET /api/orders/expired?date', () => {
  test('when all orders have expired', async () => {
    const response = await api
      .get('/api/orders/expired?date=2021-05-11T23:59:59')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(ExpiredToMatch);
  });
  test('when 0 orders have arrived', async () => {
    const response = await api
      .get('/api/orders/expired?date=2020-12-11T23:59:59')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(0);
  });
});

describe('HTTP GET /api/vaccinations?date', () => {
  test('when 2 vaccinations used during the day', async () => {
    const response = await api
      .get('/api/vaccinations?date=2021-02-09T23:59:59')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual({ used: 2, usable: 22 });
  });
  test('when 0 vaccinations used during the day and 0 are usable', async () => {
    const response = await api
      .get('/api/vaccinations?date=2021-07-09T23:59:59')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual({ used: 0, usable: 0 });
  });
});

describe('HTTP GET /api/vaccinations/:id', () => {
  test('vaccination is returned as json', async () => {
    const response = await api
      .get('/api/vaccinations/440ed0d1-5c6b-43f2-8927-fd11662c6407')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toEqual(VaccinationToMatch);
  });
  test('vaccination by the given id is not found', async () => {
    const id = '8cf916aa-5ed4-4517-bd51-5f23c8af0bcf';
    const response = await api
      .get(`/api/vaccinations/${id}`)
      .expect(404)
      .expect('Content-Type', /application\/json/);
    expect(response.text).toMatch(`Vaccination by the id of ${id} not found`);
  });
});


afterAll(async () => {
  await mongoose.connection.db.dropCollection('orders');
  await mongoose.connection.db.dropCollection('vaccinations');

  await mongoose.connection.close();
});