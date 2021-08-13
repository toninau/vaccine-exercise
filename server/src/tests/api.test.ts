import mongoose from 'mongoose';
import supertest from 'supertest';

import { Order as IOrder, Vaccination as IVaccination } from '../types';
import Order from '../models/order';
import Vaccination from '../models/vaccination';
import parseFiles from '../utils/parseFiles';
import app from '../app';
import { OrderToMatch, VaccinationToMatch } from './test_helper';

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
    expect(response.text).toMatch(`Order by the id of ${id} not found`);
  });
});

describe('HTTP GET /api/vaccinations/:id', () => {
  test('vaccination is returned as json', async () => {
    const response = await api
      .get('/api/vaccinations/3d3440e2-357b-4139-857b-027d8bdcb85b')
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