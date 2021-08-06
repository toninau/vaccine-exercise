import parseFiles from '../utils/parseFiles';
import { Order } from '../types';

describe('parseFiles tests', () => {
  test('check orders', async () => {
    const orders = await parseFiles<Order>('./src/tests/resources/orders');
    expect(orders.length).toBe(20);
  });
});