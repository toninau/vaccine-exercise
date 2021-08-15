import parseFiles from '../utils/parseFiles';
import { Order, Vaccination } from '../types';

let orders: Order[];
let vaccinations: Vaccination[];

const testOrder = {
  id: '6da3a8cf-c923-4c77-8f80-c69c935fe1df',
  orderNumber: 1,
  responsiblePerson: 'Joonatan Siloma',
  healthCareDistrict: 'KYS',
  vaccine: 'Antiqua',
  injections: 4,
  arrived: '2021-01-11T08:59:28.642790Z'
};

const testVaccination = {
  'vaccination-id': '440ed0d1-5c6b-43f2-8927-fd11662c6407',
  sourceBottle: '6da3a8cf-c923-4c77-8f80-c69c935fe1df',
  gender: 'female',
  vaccinationDate: '2021-02-09T09:38:01.642790Z'
};

beforeAll(async () => {
  orders = await parseFiles<Order>('./src/tests/resources/orders');
  vaccinations = await parseFiles<Vaccination>('./src/tests/resources/vaccinations');
});

describe('parseFiles orders', () => {
  test('correct total amount of orders', () => {
    expect(orders.length).toBe(20);
  });
  test('correct amount of Antiqua orders', () => {
    const antiquaOrders = orders.filter((order) => order.vaccine === 'Antiqua');
    expect(antiquaOrders.length).toBe(10);
  });
  test('correct amount of Zerpfy orders', () => {
    const zerpfyOrders = orders.filter((order) => order.vaccine === 'Zerpfy');
    expect(zerpfyOrders.length).toBe(10);
  });
  test('contains correct order and its fields', () => {
    const order = orders.find((order) => order.id === testOrder.id);
    expect(order).toEqual(testOrder);
  });
});

describe('parseFiles vaccinations', () => {
  test('correct total amount of vaccinations', () => {
    expect(vaccinations.length).toBe(5);
  });
  test('contains correct vaccination and its fields', () => {
    const vacciantion = vaccinations.find((v) => v['vaccination-id'] === testVaccination['vaccination-id']);
    expect(vacciantion).toEqual(testVaccination);
  });
});
